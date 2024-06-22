import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import { environment } from 'src/app/environments/environment';

const databaseKey: any = environment.servralUrl;
// const databaseKey1: any = environment.servralUrl1;


const routes = {
  signUp: {
    BasicSignUp: () => `${databaseKey}/api/auth/signup`,
    regionList: () => `${databaseKey}/api/v1/regionlist`,
    gradeList: () => `${databaseKey}/api/v1/gradelist`,
    userGetById: (employee_id: any) => `${databaseKey}/api/auth/userbyid/${employee_id}`,
    getRegionBySegID: (certificate_type_id: any) =>`${databaseKey}/api/v1/get_BysegmentId_new_region/${certificate_type_id}`,
    update: (employee_id: any) => `${databaseKey}/api/auth/updateByEmployee_id/${employee_id}`,
    getSinglePrasentDetails: (employee_id: any) => `${databaseKey}/api/auth/get_present_Details_Single/${employee_id}`,
    updateSinglePrasentDetails: (employee_id: any) => `${databaseKey}/api/auth/update_present_Details_Single/${employee_id}`,

    getById:(id:any,emp_id:any)=>`${databaseKey}/api/v1/get_by_id_approved_onboarding/${id}/${emp_id}`,
    outerForm: () => `${databaseKey}/api/auth/create_candidate`,
    getemployeeCode:()=>`${databaseKey}/api/auth/generateEmpCode`,




  },
  dropDownList:{
    getAllDesignation: () => `${databaseKey}/api/v1/getAllDesignation`,
    regionlist: () => `${databaseKey}/api/v1/getAll_new_region`,
    getAllDepartment: () => `${databaseKey}/api/v1/getAllDepartment`,
    getAllBandtype: () => `${databaseKey}/api/v1/getAllBrand`,
    getAllBrand: () => `${databaseKey}/api/v1/getAllBrand`,
    gradelist: () => `${databaseKey}/api/v1/gradelist`,
    employmentlist: () => `${databaseKey}/api/v1/employmentlist`,
    officeLocationall: () => `${databaseKey}/api/v1/getAlllocation`,
    officePhysicalLocationall: () => `${databaseKey}/api/v1/officeLocationall`,
    getAllcountry: () => `${databaseKey}/api/v1/getAllcountry`,
    getStateByCountry: (id:any) => `${databaseKey}/api/v1/getstatesbycountryid/${id}`,
    getCityByState: (id:any) => `${databaseKey}/api/v1/getcitybystateid/${id}`,
    getPincodeByCity: (id:any) => `${databaseKey}/api/v1/getpincodebycityid/${id}`,
  },

  getSingleFamily: (id: any) => `${databaseKey}/api/v1/getfamilydetails/${id}`,
  updateSingleFamily: (id: any) => `${databaseKey}/api/v1/familydetailupdate/${id}`,
  deleteSingleFamily: (id: any) => `${databaseKey}/api/v1/deletefamilydetails/${id}`,

  createPreEmp: () => `${databaseKey}/api/v1/prevempdetail`,
  updatePreEmp: (id: any) => `${databaseKey}/api/v1/update_previous_detail_emp/${id}`,
  getSinglePreEmp: (id: any) => `${databaseKey}/api/v1/getprevempdetails/${id}`,
  deleteSinglePreEmp: (id: any) => `${databaseKey}/api/v1/deleteprevempdetails/${id}`,
  // outerForm For Condidate
  employeeForm:(id:any) =>`${databaseKey}/api/v1_get_employee/${id}`,
  employeeFormSubmit:(id:any) =>`${databaseKey}/api/v1/sending_status_on_form_submit/${id}`,
  TrackOuterform:(id:any) =>`${databaseKey}/api/auth/form_submit_status/${id}`,
  getSalaryBeakup:(id:any)=>`${databaseKey}/api/v1/salary_calculate_by_id/${id}`,
  getEmpData:(id:any)=>`${databaseKey}/api/v1/employee_data/${id}`,

  signUpList: {
    employList: () => `${databaseKey}/api/auth/registrationall`,
    deleteSingleEmployee: (id:any) => `${databaseKey}/api/auth/updateEmpDetail/${id}`,
    deleteAuditor: (id:any) => `${databaseKey}/api/v1/deleted_auditorbyid/${id}`,


    //
  },
  getSingleEmp: (id: any) => `${databaseKey}/api/auth/userbyid/${id}`,
  getAllRoleMaster: (role: any) => `${databaseKey}/api/v1/getAllRoleMaster/${role}`,

  salaryDetails: {
    salaryUpdate: (employee_id: any) => `${databaseKey}/api/v1/salaryDetailsUpdateByemployee_id/${employee_id}`,
    salaryCreate: () => `${databaseKey}/api/v1/salaryDetails`,

  },
  paymentsDetails: {
    paymentCreate: () => `${databaseKey}/api/v1/createempbankdetails`,
    paymentUpdate: (id:any) => `${databaseKey}/api/v1/empbankdetailsupdate/${id}`,
    getSinglePayment: (id:any) => `${databaseKey}/api/v1/empbankdetailget/${id}`,
    getAllBanks: () => `${databaseKey}/api/v1/bankdetails/getall`,
  },
  personalDetails: {
    familyDetails: () => `${databaseKey}/api/v1/familydetail`,
    priviousEmploy: () => `${databaseKey}/api/v1/prevempdetail`,
    presentDetals: (employee_id: any) => `${databaseKey}/api/auth/updateEmpDetail/${employee_id}`,
    postPersonalDetails: (employee_id: any) => `${databaseKey}/api/v1/userupdateEmp/${employee_id}`,
    updateemp_paymentAccount:(id:any)=>`${databaseKey}/api/v1/updateemp_paymentAccount/${id}`,
  },
  documentsDetails: {
    documentCreate: () => `${databaseKey}/api/v1/empdocumentdetail`,
    documentUpdate: (id:any) => `${databaseKey}/api/v1/empdocumentdetailupdate/${id}`,
    getSingleDocument: (id:any) => `${databaseKey}/api/v1/getdocumentdetails/${id}`,
    deleteDocument: (id:any) => `${databaseKey}/api/v1/deletedocumentdetails/${id}`,
  },

  // finance 
  getAllFinance: () => `${databaseKey}/api/v1/getAllfinancedetail`,
  getRegion_PMS: () => `${databaseKey}/api/v1/getAll_new_noduplicate_region`,


  //All Managers List 
   getManagerList: () => `${databaseKey}/api/v1/get_all_managers`,
  
  empBy:{
    get_employee_by_id: (id:any) => `${databaseKey}/api/auth/get_employee_by_id/${id}`,
  },

}


@Injectable({
  providedIn: 'root'
})
export class EmpRegistrationService {
  messageSubject = new Subject<any>();
  signatureId(id:any){
    this.messageSubject.next(id);
  }
  getAchievementList() {
    throw new Error('Method not implemented.');
  }

  empId:any = new BehaviorSubject(null);
  empTitle:any = new BehaviorSubject(null);

  constructor(private httpclient: HttpClient,) { }
  basicSignUp(data: any,img:File): Observable<any> {
    const formData = new FormData();
    if (img) {
      formData.append('employee_photo', img, img.name);
    } else {
      formData.append('employee_photo', "undefined");
    }
    for (let key in data) {
      formData.append(`${key}`, data[key])
    }

    
    return this.httpclient.post(routes.signUp.BasicSignUp(), formData)
  }
  outerFormCondidate(data: any,img:File): Observable<any> {
    const formData = new FormData();
    if (img) {
      formData.append('employee_photo', img, img.name);
    } else {
      formData.append('employee_photo', "undefined");
    }
    for (let key in data) {
      formData.append(`${key}`, data[key])
    }

    
    return this.httpclient.post(routes.signUp.outerForm(), formData)
  }
  grtEmployeeList() {
    return this.httpclient.get(routes.signUpList.employList())
  };

  getAllManagersList(){
    return this.httpclient.get(routes.getManagerList())
  }

  deleteSingleEmployee(id:any, data:any) {
    return this.httpclient.put(routes.signUpList.deleteSingleEmployee(id),data);
  }
  deleteAuditor(id:any) {
    return this.httpclient.put(routes.signUpList.deleteAuditor(id),"");
  }
  //
  getSingleEmp(id: any): Observable<any> {
    return this.httpclient.get<any>(routes.getSingleEmp(id));
  }

  getAllRoleMaster(role: any): Observable<any> {
    return this.httpclient.get<any>(routes.getAllRoleMaster(role));
  }
  getRegionList(): Observable<any> {
    return this.httpclient.get(routes.signUp.regionList())
  }
  getGradeList(): Observable<any> {
    return this.httpclient.get(routes.signUp.gradeList())
  }
  //basic n personal by id
  getByUserId(employee_id: any): Observable<any> {
    return this.httpclient.get(routes.signUp.userGetById(employee_id))
  }
  getAutoGenerateById(data:any){
    return this.httpclient.post(routes.signUp.getemployeeCode(), data)
  }
  getRegionByID(certificateId: any): Observable<any> {
    return this.httpclient.get(routes.signUp.getRegionBySegID(certificateId));
   }
  updateEmploy(employee_id: any, data: any, img:File) {
    const formData = new FormData();
    if (img) {
      formData.append('employee_photo', img, img.name);
    } else {
      formData.append('employee_photo', "undefined");
    }
    for (let key in data) {
      formData.append(`${key}`, data[key])
    }
    return this.httpclient.put(routes.signUp.update(employee_id), formData)
  };

  getSinglePrasentDetails(employee_id: any): Observable<any> {
    return this.httpclient.get(routes.signUp.getSinglePrasentDetails(employee_id))
  }
  updateSinglePrasentDetails(employee_id: any,data:any): Observable<any> {
    return this.httpclient.put(routes.signUp.updateSinglePrasentDetails(employee_id),data)
  }
  
  UpdateSalary(employee_id: any, formData: any): Observable<any> {
    return this.httpclient.put(routes.salaryDetails.salaryUpdate(employee_id), formData)
  }

  // dropdown list
  employmentlist_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.employmentlist());
  };
  getAllBandtype_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getAllBandtype());
  };

  getAllBrand_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getAllBrand());
  };

  getAllDepartment_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getAllDepartment());
  };

  getAllDesignation_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getAllDesignation());
  };

  gradelist_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.gradelist());
  };

  officeLocationall_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.officeLocationall());
  };
  physicalLocationall_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.officePhysicalLocationall());
  };

  getAllcountry(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getAllcountry());
  };

  getStateByCountry(id:any): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getStateByCountry(id));
  };
  
  getCityByState(id:any): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getCityByState(id));
  };

  getPincodeByCity(id:any): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.getPincodeByCity(id));
  };

  // officePhysicalLocationall

  regionlist_dropDown(): Observable<any> {
    return this.httpclient.get<any>(routes.dropDownList.regionlist());
  };

  regionlist_PMS(): Observable<any> {
    return this.httpclient.get<any>(routes.getRegion_PMS());
  };


  //personal details
  familyCreate(data: any): Observable<any> {
    return this.httpclient.post(routes.personalDetails.familyDetails(), data)
  }
  priviousCreate(data: any): Observable<any> {
    return this.httpclient.post(routes.personalDetails.priviousEmploy(), data)
  }

  updateEmploypersonal(employyee_id: any, data: any): Observable<any> {
    return this.httpclient.put(routes.personalDetails.presentDetals(employyee_id), data)
  };

  updateEmploypersonal_2(employyee_id: any, data: any): Observable<any> {
    return this.httpclient.put(routes.personalDetails.postPersonalDetails(employyee_id), data)
  };

  updateemp_paymentAccount(id:any, data:any){
    return this.httpclient.patch(routes.personalDetails.updateemp_paymentAccount(id), data)
  }

  getSingleFamilyDetails(id:any) :Observable<any>{
    return this.httpclient.get<any>(routes.getSingleFamily(id));
  };

  updateSingleFamilyDetails(id:any,data:any) :Observable<any>{
    return this.httpclient.put<any>(routes.updateSingleFamily(id),data);
  };

  deleteSingleFamily(id:any) :Observable<any>{
    return this.httpclient.put<any>(routes.deleteSingleFamily(id),{});
  };

  // pre emp
  createPrevEmp(data:any) :Observable<any>{
    return this.httpclient.post<any>(routes.createPreEmp(),data);
  };

  getSinglePrevEmp(id:any) :Observable<any>{
    return this.httpclient.get<any>(routes.getSinglePreEmp(id));
  };

  updateSinglePrevEmp(id:any,data:any) :Observable<any>{
    return this.httpclient.patch<any>(routes.updatePreEmp(id),data);
  };

  deleteSinglePrevEmp(id:any) :Observable<any>{
    return this.httpclient.put<any>(routes.deleteSinglePreEmp(id),{});
  };

  //paymentdetails

  paymentdetailsCreate(data: any) :Observable<any>{
    return this.httpclient.post(routes.paymentsDetails.paymentCreate(), data);
  };

  paymentdetailsUpdate(id:any, data: any) :Observable<any>{
    return this.httpclient.put(routes.paymentsDetails.paymentUpdate(id), data);
  };

  getSinglePaymentDetails(id:any) :Observable<any>{
    return this.httpclient.get<any>(routes.paymentsDetails.getSinglePayment(id));
  };
  
  getAllBanks() :Observable<any>{
    return this.httpclient.get<any>(routes.paymentsDetails.getAllBanks());
  };

  //documents

  create_DocumentDetails(data: any, img:File): Observable<any> {
    const formData = new FormData();
    
    
    if (img) {
      formData.append('document_file', img, img.name);
    }
    delete data.document_file
    for (let key in data) {
      formData.append(`${key}`, data[key])
    }
    return this.httpclient.post(routes.documentsDetails.documentCreate(), formData)
  }

  update_DocumentDetails(id:any, data: any, img:File): Observable<any> {
    const formData = new FormData();
    
    
    if (img) {
      formData.append('document_file', img, img.name);
    }
    delete data.document_file
    for (let key in data) {
      formData.append(`${key}`, data[key])
    };
    
    return this.httpclient.put<any>(routes.documentsDetails.documentUpdate(id), formData)
  };

   getSingleDocument(id:any) : Observable<any>{
    return this.httpclient.get<any>(routes.documentsDetails.getSingleDocument(id));
   };

   deleteDocument(id:any) : Observable<any>{
    return this.httpclient.put<any>(routes.documentsDetails.deleteDocument(id),"");
   };

  setEmpId(id:any){
   this.empId.next(id);
  };

  getEmpId(){
    return this.empId;
  }

  setEmpTitle(title:string){
   this.empTitle.next(title);
  };

  getEmpTitle(){
    return this.empTitle;
  }

  getFinanceList(): Observable<any> {
    return this.httpclient.get(routes.getAllFinance())
  }

  getById(id:any,emp_id:any){
    return this.httpclient.get(routes.signUp.getById(id,emp_id))
  }

  empGetById(id:any){
    return this.httpclient.get(routes.empBy.get_employee_by_id(id))
  }
  employeeFormSubmit(id:any, data:any){
    return this.httpclient.post(routes.employeeFormSubmit(id), data)
  }
  getOuterEmployeeData(id:any){
    return this.httpclient.get(routes.employeeForm(id))
  }

  TrackOuterform(id:any){
    return this.httpclient.get(routes.TrackOuterform(id))
  }
   getSalaryData(id:any){
    return this.httpclient.get(routes.getSalaryBeakup(id))
   }

   getemployeeData(id:any){
    return this.httpclient.get(routes.getEmpData(id))
   }
}

