import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-generat-invoice-action',
  templateUrl: './generat-invoice-action.component.html',
  styleUrls: ['./generat-invoice-action.component.scss']
})

export class GeneratInvoiceActionComponent implements OnInit {
  jobIdNew: any;
  emailIdNew: any;
  achivementId: any;
  grivanceId: any;
  complaint_id: any;
  helpDeskId: any;
  achieveId: any;
  resignId: any;
  enableValidate: boolean = false;
  enableAssign: boolean = false;
  enableProspect: boolean = false;
  enableAccount: boolean = false;
  enableOpportunity: boolean = false;
  enableSendL1: boolean = false;
  enablePreL1: boolean = false;
  enablePreL2: boolean = false;
  enableQuote: boolean = false;
  prepareQuote: boolean = false;
  updateQuote: boolean = false;
  updateApprove: boolean = false;
  updateSM: boolean = false;
  sentPI: boolean = false;
  workOrder: boolean = false;
  finalEditor: boolean = false;
  taskOrder: boolean = false;
  postReview: boolean = false;
  l1Reviewed: boolean = false;
  datesManaged: boolean = false;
  performaInvoiceSent: boolean = false;
  documentUploaded: boolean = false;
  lead_genration_id: any;
  responseSent: boolean = false;
  responseConfirm: boolean = false;
  poReceived: boolean = false;
  openHouseNew: boolean = false;
  nonCert: any;
  leadService: any;
  lead_id: boolean;
  constructor(
    private route: Router,
    private toast: ToastrService

  ) {
   }

  ngOnInit(): void {}
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);

  }
  openHouseClick(e: any) {}
  getValueToDisplay(params: ICellRendererParams) {

    this.lead_genration_id = params.data.lead_genration_id;

  }

  emailSend(e:any){
    e.stopPropagation();

      this.route.navigate(
        ['master/audit/pre-audit/generate-invoice/finance-invoice'],
        { queryParams: { lead_genration_id: this.lead_genration_id}}
      );





  }
}




