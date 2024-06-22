import { Component, OnInit } from '@angular/core';
import {  ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

declare var require: any;
const FileSaver = require('file-saver');
@Component({
  selector: 'app-ticket-pdf-download',
  template: ` <a
    href="javascript:void(0)"
    style="cursor:pointer"
    (click)="downloadPdf($event)"
  >
      {{ value?.attach_ticket || value?.attach_ticket }} Pdf
  </a> `,




  styles: ['p{color:cadetblue}'],
})
export class TicketPdfDownloadComponent implements ICellRendererAngularComp {
  value?: any;
  cellValue: any;
  constructor() {}

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
    
    const pdfUrl = this.value?.attach_ticket ;
    const pdfName = this.value?.attach_ticket ;
    
    
    
    FileSaver.saveAs(pdfUrl, pdfName);
 

    e.stopPropagation();
  }
}
