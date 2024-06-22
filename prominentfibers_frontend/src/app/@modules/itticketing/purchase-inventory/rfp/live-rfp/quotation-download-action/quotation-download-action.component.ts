import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-quotation-download-action',
  templateUrl: './quotation-download-action.component.html',
  styleUrls: ['./quotation-download-action.component.scss']
})
export class QuotationDownloadActionComponent implements ICellRendererAngularComp {
  quotationSelect:boolean;
  id:any;
  checkboxShow:boolean = false;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router: Router,
    private toastr:ToastrService,
    private prService: PurchaseRequestService,
    private updateTableData:DataUpdateService,
    private activeroute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.pr_id;
    });

    if(this.router.url.includes('rfp/live-rfp')){
      this.checkboxShow = false
    }else{
      this.checkboxShow = true
    }
    
   }
  public cellValue: any;
  isChecked:boolean;
  checkBox:boolean;
  selectedCheckbox:any;
  isAnyRowChecked:boolean;
  parentComponent:any;
  selectedRow:any



  
  agInit(params: ICellRendererParams): void {
    
    this.cellValue = this.getValueToDisplay(params);
    
  } 

  getValueToDisplay(params: ICellRendererParams) {
    
    this.checkBox = params.data.checked;
    
    if (this.checkBox === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    
    return params;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  downloadFile(event:any){
    
    const pdfUrl = this.cellValue.data.vendor_uploaded_document;
    const pdfName = 'Uploded Document';
    FileSaver.saveAs(pdfUrl, pdfName);
    event.stopPropagation();
    
  }



  isRowSelected():boolean{
    return this.cellValue.node.data === this.selectedRow
  }




  selectQuotation(event:any,isChecked:boolean){
    let id = this.cellValue.data.vendor_product_details_id;
    let data= {
      checked: isChecked,
      procurement_product_id:this.cellValue.data.procurement_product_id
    }
   let status = isChecked ? 'Selected' : 'Deselected'
 
    this.prService.quotationSelectById(id,data).subscribe((res:any) => {
      if(res && res.code == 200){
        this.toastr.success(`Quotation ${status} successfully.`);
        this.getAllQuotationDetails();
      }
   },err =>{
      this.toastr.error('Something went wrong')
   })
  }

  getValue():any {
    return this.cellValue.data.checked;
  }

  getAllQuotationDetails(){
    this.prService.getAllQuotationDetails(this.id).subscribe((res:any)=>{
      const rowData = res;
      this.updateTableData.setTableData(rowData)
      })
  }

}
