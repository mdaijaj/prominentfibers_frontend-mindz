import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, forkJoin } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const databaseKey: any = environment.servralUrl;
const routes = {
  product:{
    getList: () => `${databaseKey}/api/v1/getAllItem`,
    getProdById:(id:any)=> `${databaseKey}/api/v1/get_ById_item/${id}`,
    getItemByAsset:(id:any)=> `${databaseKey}/api/v1/getItemByAssetId/${id}`,
    createItem: () => `${databaseKey}/api/v1/create_item`,
    deleteItem:(id:any)=> `${databaseKey}/api/v1/delete_item/${id}`,
    updateItem:(id:any)=> `${databaseKey}/api/v1/edit_item/${id}`
  },

  service:{
    serviceMaster_create: () => `${databaseKey}/api/v1/createServiceMaster`,
    serviceMaster_List: () => `${databaseKey}/api/v1/getAllServices`,
    serviceMasterGetById: (id: any) =>
      `${databaseKey}/api/v1/getAllServices/${id}`,
    serviceMasterDelete: (id: any) =>
      `${databaseKey}/api/v1/deleteServices/${id}`,
    serviceMaster_update: (id: any) =>
      `${databaseKey}/api/v1/update_services/${id}`,
    statusById: (id: any) =>
      `${databaseKey}/api/v1/updateServiceStatus/${id}`,
  },

  empData:{
    getEmpById: (id:any) => `${databaseKey}/api/v1/get_ById_user/${id}`,
  },

  pr:{
    create_pr:()=>`${databaseKey}/api/v1/create_PR_request`,
    getAllPrList:(id:any)=>`${databaseKey}/api/v1/getAll_Product/${id}`,
    getApprovePr:(id:any)=>`${databaseKey}/api/v1/getAll_Approved_pr/${id}`,
    getRejectedPr:(id:any)=>`${databaseKey}/api/v1/getAll_Rejected_pr/${id}`,
    getCategoryIdBy:(id:any)=>`${databaseKey}/api/v1/get_ById_item/${id}`,
    getAllCategory: ()=>`${databaseKey}/api/v1/get_All_Category_Master`,
    getAllServiceCategory: ()=>`${databaseKey}/api/v1/serviesgetallcategroy`,
    getToBeAppPr: (idEmp:any)=>`${databaseKey}/api/v1/getAll_to_be_approve_pr/${idEmp}`,
    createCategory: ()=>`${databaseKey}/api/v1/create_Category_Master`,
    getAssetCatById: (id:any)=>`${databaseKey}/api/v1/get_ById_Category_Master/${id}`,
    editCategoryMaster: (id:any)=>`${databaseKey}/api/v1/edit_Category_Master/${id}`,
    get_ById_PR:()=>`${databaseKey}/api/v1/get_ById_PR`,
    updatePr:(id:any)=> `${databaseKey}/api/v1/editPR_request/${id}`,
    updatePrStatus: (id:any)=>`${databaseKey}/api/v1/update_status/${id}`,
    getProductAllBom:()=>`${databaseKey}/api/v1/get_Bom_By_Type`,
    getByVerient: (id:any)=>`${databaseKey}/api/v1/getProductVarient/${id}`,
    getAllItemVerient:(id:any)=>`${databaseKey}/api/v1/getAllItems/${id}`,
    getByPr:(id:any)=>`${databaseKey}/api/v1/getAll_Product_ById/${id}`,
    getByApprovelLevel:(id:any)=>`${databaseKey}/api/v1/getAll_Approvel_level/${id}`,
    getInitiateRfp:()=>`${databaseKey}/api/v1/get_Approved_pr`,
    getByRfpLink:(id:any)=>`${databaseKey}/api/v1/getVendor_replyData/${id}`

  },

  po: {
    create_po:()=>`${databaseKey}/api/v1/Create_PO_request`,
    generate_po:()=>`${databaseKey}/api/v1/generatePoNumber`,
    getAllPoList:()=>`${databaseKey}/api/v1/get_all_po`,
    getApprovePo:()=>`${databaseKey}/api/v1/get_all_Approved_PO`,
    getRejectedPo:()=>`${databaseKey}/api/v1/get_all_Rejected_PO`,
    get_ById_PO:(id: any)=>`${databaseKey}/api/v1/get_po_Byid/${id}`,
    updatePo:(id:any)=> `${databaseKey}/api/v1/update_draft_po/${id}`,
    getByApprovelPoLevel:(id:any)=>`${databaseKey}/api/v1/getAll_PO_Approval_level/${id}`,
    updatePoStatus: (id:any)=>`${databaseKey}/api/v1/approved_po_ByPO_ID/${id}`,
  },

  approverLavel:{
    createApproverLavel:()=>`${databaseKey}/api/v1/create_Approved`,
    getAll_Approvel_level:()=>`${databaseKey}/api/v1/getAll_Approvel_level`,
    getAppLavelById:(id:any) => `${databaseKey}/api/v1/get_ById_Approver/${id}`,
    editAppLevel:(id:any)=>`${databaseKey}/api/v1/update_approvel_status/${id}`
  },

  rfp:{
    sendrfp:()=>`${databaseKey}/api/v1/sendRFP`,
    sendRfpLink:(id:any) => `${databaseKey}/api/v1/update_vendorData/${id}`,
    getAllLiveRfp:()=>`${databaseKey}/api/v1/GetAll_liveRFP`,
    updateExtendDate:(id:any)=>`${databaseKey}/api/v1/update_endDate/${id}`,
    getAllCloseRfp:()=>`${databaseKey}/api/v1/GetAll_CloseRFP`,
    getAllQuotationDetails:(id:any)=>`${databaseKey}/api/v1/getAll_vendor_pr/${id}`,
    getQuotationApproval:(id:any)=>`${databaseKey}/api/v1/quotation_approvel/${id}`,
    updateEndDate:(id:any)=>`${databaseKey}/api/v1/update_endDate/${id}`,
    deleteLiveRfp:(id:any)=>`${databaseKey}/api/v1/delete_live_rfp/${id}`,
    getPreviousQuoteDetails:(id:any,vendorId:any)=>`${databaseKey}/api/v1/getVendor_replyData/${id},${vendorId}`,
    sendrfpBom:()=>`${databaseKey}/api/v1/sendRFPforBOM`,
    sendrfpService:()=>`${databaseKey}/api/v1/sendRFPforService`,
    // getByRfpBomLink:(id:any)=>`${databaseKey}/api/v1/getVendor_replyDataforBOM/${id}`,
    getByRfpServiceLink:(id:any,rfpNo:any,type:any)=>`${databaseKey}/api/v1/getVendor_replyDataforService?vendor_id=${id}&Rfp_no=${rfpNo}&type=${type}`,
    getByRfpBomLink:(id:any,rfpNo:any,type:any)=>`${databaseKey}/api/v1/getVendor_replyDataforBOM?vendor_id=${id}&Rfp_no=${rfpNo}&type=${type}`,

  },
  quotation:{
    getAllPendingApproval:()=>`${databaseKey}/api/v1/GetAll_Approved_vendor`,
    getAllapprovedCost:()=>`${databaseKey}/api/v1/GetAll_Approved_Cost`,
    getAllRejectedList:()=>`${databaseKey}/api/v1/GetAll_rejected`,
    quotationReject:(id:any)=>`${databaseKey}/api/v1/approvel_cost_rejected/${id}`,
    quotationSelect:(id:any)=>`${databaseKey}/api/v1/checked_value_ture/${id}`,
  },

  purchaseOrder:{
    getPOById:(id:any) => `${databaseKey}/api/v1/getAll_Approved_pr_getBy_id/${id}`,
    createPurchageOrder:(id:any)=>`${databaseKey}/api/v1/po_issued/${id}`,
    getAllIssuedPO:()=>`${databaseKey}/api/v1/getAll_issued_po`,
    getAllPOIssuedapproved:(id: any)=>`${databaseKey}/api/v1/get_to_be_approved_po/${id}`,
    getAlldraftPO:()=>`${databaseKey}/api/v1/getAll_draft_po`,
  },

  invoice:{
    getInvoiceDetailsById:(id:any)=> `${databaseKey}/api/v1/getBy_idAll_issued_po/${id}`,
    genrateInvoice:(id:any)=>`${databaseKey}/api/v1/invoice_status_update/${id}`
  },

  grn:{
    getAllGRNList:()=>`${databaseKey}/api/v1/getAll_GRN`,
    getForGRNById:(id:any)=>`${databaseKey}/api/v1/getBy_id_GRN/${id}`,
    updateGRNById:(id:any)=>`${databaseKey}/api/v1/update_grn/${id}`
  },

  inventory:{
       getAllInventoryList:()=>`${databaseKey}/api/v1/inventory_Data`,
  },

  //assest_management
  assest_master:{
    create_assest_master:()=>`${databaseKey}/api/v1/create_Asset_Product_Management`,
    get_assets_product_list:()=>`${databaseKey}/api/v1/get_All_Asset_Product_Master`,
    getbyid_assets_product_list:(id:any)=>`${databaseKey}/api/v1/get_BycategoryId_Asset_Product_Master/${id}`,

}

  

}

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  procurementProductId: any = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  //
  create_assest_master(data:any):Observable<any> {
    return this.http.post(routes.assest_master.create_assest_master(),data);
  };
  get_assets_product_list():Observable<any> {
    return this.http.get(routes.assest_master.get_assets_product_list());
  };
  getbyid_assets_product_list(id:any):Observable<any> {
    return this.http.get(routes.assest_master.getbyid_assets_product_list(id));
  };


  //

  getAllProd():Observable<any> {
    return this.http.get(routes.product.getList());
  };

  getProdById(id:any){
    return this.http.get(routes.product.getProdById(id));
  }

  getItemByAsset(id:any){
    return this.http.get(routes.product.getItemByAsset(id));
  }

  createItem(data:any){
    return this.http.post(routes.product.createItem(), data);
  }

  deleteItem(id: any, data: any): Observable<any> {
    return this.http.put(routes.product.deleteItem(id), data);
  }

  updateItem(id:any, data:any) : Observable<any>{
    return this.http.put(routes.product.updateItem(id), data);
  }

  // service master start
  getAllServiceMaster():Observable<any> {
    return this.http.get(routes.service.serviceMaster_List());
  };

  getServiceMasterById(id:any){
    return this.http.get(routes.service.serviceMasterGetById(id));
  }

  createServiceMaster(data:any){
    return this.http.post(routes.service.serviceMaster_create(), data);
  }

  deleteServiceMaster(id: any, data: any): Observable<any> {
    return this.http.delete(routes.service.serviceMasterDelete(id), data);
  }

  updateServiceMaster(id:any, data:any) : Observable<any>{
    return this.http.put(routes.service.serviceMaster_update(id), data);
  }
  // service master end

  getEmpById(id:any){
    return this.http.get(routes.empData.getEmpById(id))
  }

  createPr(data:any){
    return this.http.post(routes.pr.create_pr(), data);
  }

  getAllPrList(id:any,data:any){
    return this.http.post(routes.pr.getAllPrList(id),data)
  }

  getApprovePrList(id:any, data: any){
    return this.http.post(routes.pr.getApprovePr(id), data)
  }

  getRejectedPrList(id:any, data: any){
    return this.http.post(routes.pr.getRejectedPr(id), data)
  }

  getAllCategory(){
    return this.http.get(routes.pr.getAllCategory());
  }
  getAllServiceCategory(){
    return this.http.get(routes.pr.getAllServiceCategory());
  }

  getCategoryIdBy(id:any){
    return this.http.get(routes.pr.getCategoryIdBy(id));
  }

  getToBeAppPr(idEmp:any){
    return this.http.get(routes.pr.getToBeAppPr(idEmp));
  }

  createAssetCategory(data:any){
    return this.http.post(routes.pr.createCategory(), data);
  } 

  getAssetCatById(id:any){
    return this.http.get(routes.pr.getAssetCatById(id)); 
  }

  editCategoryMaster(id: any, data: any): Observable<any> {
    return this.http.put(routes.pr.editCategoryMaster(id), data);
  }

  getAllApproverList(data: any){
    return this.http.post(routes.approverLavel.getAll_Approvel_level(), data)
  }

  createApprover(data:any){
    return this.http.post(routes.approverLavel.createApproverLavel(), data);
  } 

  getByIdApproverLavel(id:any){
    return this.http.get(routes.approverLavel.getAppLavelById(id)); 
  }

  updateApproverLeval(id: any, data: any): Observable<any> {
    return this.http.put(routes.approverLavel.editAppLevel(id), data);
  }

  getByIdPR(data:any){
    return this.http.post(routes.pr.get_ById_PR(), data); 
  }

  updatePr(id: any, data: any): Observable<any> {
    return this.http.put(routes.pr.updatePr(id), data);
  }

  updatePrStatus(id: any, data: any): Observable<any> {
    return this.http.post(routes.pr.updatePrStatus(id), data);
  }

  sendRfpLink( data: any): Observable<any> {
    return this.http.put(routes.rfp.sendrfp(), data);
  }
  sendRfpBom( data: any): Observable<any> {
    return this.http.put(routes.rfp.sendrfpBom(), data);
  }
  sendRfpService( data: any): Observable<any> {
    return this.http.put(routes.rfp.sendrfpService(), data);
  }
  // updateVendorData(ids:number[], data:any):Observable<any[]>{
  //   const updateRequest:Observable<any>[]= ids.map(id => this.http.put(routes.rfp.sendRfpLink(id),data))
  //   // return this.http.put(routes.rfp.sendRfpLink(id),data);
  //   return forkJoin(updateRequest)
  // }

  updateVendorData(id:any, data:any):Observable<any>{
    return this.http.put(routes.rfp.sendRfpLink(id),data);
  }
  getAllLiveRfp(){
    return this.http.get(routes.rfp.getAllLiveRfp())
  }

  updateExtendDate(id:any,data:any){
    return this.http.put(routes.rfp.updateExtendDate(id),data)
  }
  updateEndDate(id:any,data:any){
    return this.http.put(routes.rfp.updateEndDate(id),data)
  }

  getAllCloseRfp(){
    return this.http.get(routes.rfp.getAllCloseRfp())
  }

  getAllQuotationDetails(id:any){
    return this.http.get(routes.rfp.getAllQuotationDetails(id)); 
  }

  getQuotationApproval(id:any,data:any){
    return this.http.put(routes.rfp.getQuotationApproval(id),data);
  }

  getAllPendingApproval(){
    return this.http.get(routes.quotation.getAllPendingApproval())
  }

  getAllapprovedCost(){
    return this.http.get(routes.quotation.getAllapprovedCost())
  }

  getAllRejectedList(){
    return this.http.get(routes.quotation.getAllRejectedList())
  }

  quotationRejectById(id:any,data:any){
    return this.http.put(routes.quotation.quotationReject(id),data);
  }

  deleteLiveRfp(id:any,data:any):Observable<any>{
    return this.http.put(routes.rfp.deleteLiveRfp(id),data);
  }

  quotationSelectById(id:any,data:any){
    return this.http.put(routes.quotation.quotationSelect(id),data);
  }


  getPOById(id:any){
    return this.http.get(routes.purchaseOrder.getPOById(id)); 
  }

  createPurchageOrder(id:any,data:any):Observable<any>{
    return this.http.put(routes.purchaseOrder.createPurchageOrder(id),data);
  }

  getAllIssuedPO():Observable<any>{
    return this.http.get(routes.purchaseOrder.getAllIssuedPO()); 
  }
  getAlltobeIssuedPO(id:any):Observable<any>{
    return this.http.get(routes.purchaseOrder.getAllPOIssuedapproved(id)); 
  }

  getAlldraftPO(data: any):Observable<any>{
    return this.http.post(routes.purchaseOrder.getAlldraftPO(),data); 
  }

  getInvoiceDetailsById(id:any):Observable<any>{
    return this.http.get(routes.invoice.getInvoiceDetailsById(id)); 
  }

   genrateInvoice(id:any,data:any):Observable<any>{
    return this.http.put(routes.invoice.genrateInvoice(id),data); 
  }

  getAllGRNList():Observable<any>{
    return this.http.get(routes.grn.getAllGRNList()); 
  }

  getForGRNById(id:any):Observable<any>{
    return this.http.get(routes.grn.getForGRNById(id)); 
  }

  updateGRNById(id:any,data:any):Observable<any>{
    return this.http.put(routes.grn.updateGRNById(id),data); 
  }
  getAllInventoryList():Observable<any>{
    return this.http.get(routes.inventory.getAllInventoryList()); 
  }
  getPreviousQuotationDetails(id:any,vendorId:any):Observable<any>{
    return this.http.get(routes.rfp.getPreviousQuoteDetails(id,vendorId)); 
  }

  getProductAllBom(data:any){
    return this.http.post(routes.pr.getProductAllBom(),data);
  }
  
  getByVerient(id:any){
    return this.http.get(routes.pr.getByVerient(id));
  }
  
  getAllItemVerient(id:any,data:any){
    return this.http.post(routes.pr.getAllItemVerient(id),data);
  }

  getByPr(id:any){
    return this.http.get(routes.pr.getByPr(id));
  }
  
  getInitiateRfp(){
    return this.http.get(routes.pr.getInitiateRfp());
  }

  getByApprovelLevel(id:any,data:any){
    return this.http.post(routes.pr.getByApprovelLevel(id),data);
  }

  getByRfpLink(id:any){
    return this.http.get(routes.pr.getByRfpLink(id));
  }
 //////////// purchase order start//////////
  createPo(data:any){
    return this.http.post(routes.po.create_po(), data);
  } 

  generatePo(data:any){
    return this.http.post(routes.po.generate_po(), data);
  } 

  getAllPoList(data: any){
    return this.http.post(routes.po.getAllPoList(), data);
  }

  getApprovePoList(data:any){
    return this.http.post(routes.po.getApprovePo(), data)
  }

  getRejectedPoList(data:any){
    return this.http.post(routes.po.getRejectedPo(), data)
  }

  getByIdPO(id: any,data: any){
    return this.http.post(routes.po.get_ById_PO(id), data); 
  }

  updatePo(id: any, data: any): Observable<any> {
    return this.http.put(routes.po.updatePo(id), data);
  }

  updatePoStatus(id: any, data: any): Observable<any> {
    return this.http.post(routes.po.updatePoStatus(id), data);
  }

  getByApprovelPoLevel(id:any){
    return this.http.get(routes.po.getByApprovelPoLevel(id));
  }
  
  //////////// purchase order end//////////

  getByRfpBomLink(id:any,rfpNo:any,type:any){
    return this.http.get(routes.rfp.getByRfpBomLink(id,rfpNo,type));
  }
  getByRfpServiceLink(id:any,rfpNo:any,type:any){
    return this.http.get(routes.rfp.getByRfpServiceLink(id,rfpNo,type));
  }
}
