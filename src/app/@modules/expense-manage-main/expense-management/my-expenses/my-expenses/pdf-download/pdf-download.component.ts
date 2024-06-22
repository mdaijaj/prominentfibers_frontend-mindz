import { Component, OnInit } from '@angular/core';
import {  ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-pdf-download',
  template: ` <a
    href="javascript:void(0)"
    style="cursor:pointer"
    (click)="downloadPdf($event)"
  >
  {{ value.attachedBill?'download file':'file not found' }}
  </a>`,

  styles: ['p{color:cadetblue}'],
})
export class PdfDownloadComponent implements ICellRendererAngularComp {
  value?: any;
  cellValue: any;
  constructor(private toster:ToastrService) {}


  
  agInit(params: ICellRendererParams<any, any>): void {
    this.value = this.getValueToDisplay(params);
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.data;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  downloadPdf(e: any) {
    console.log(this.value)
    e.stopPropagation();
    if(this.value.attachedBill){
      const pdfUrl = this.value?.attachedBill || null;
      const pdfName = this.value?.attachedBill || null;
      FileSaver.saveAs(pdfUrl, pdfName);
    }else{
      this.toster.error('selected file not found',"Can't donwload");
    }
    
  }
}
