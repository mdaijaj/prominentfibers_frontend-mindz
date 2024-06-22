import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovedComponent } from './approved/approved.component';
import { QuotationListComponent } from './list-quotation/list-quotation.component';
import { PerformInvoiceComponent } from './perform-invoice/perform-invoice.component';
import { ProformaInvoiceComponent } from './proforma-invoice/proforma-invoice.component';
import { QuotationComponent } from './quotaion/quotation.component';
import { QuotationHome } from './quotation-home/quotation-home.component';
import { SMApprovedListComponent } from './s&m-approved-list/s&m-approved-list.component';
import { UpdateProformaInvoiceComponent } from './update-proforma-invoice/update-proforma-invoice.component';

const routes: Routes = [
    { path: '', component: QuotationHome },
    { path: 'quotation-list', component: QuotationListComponent },
    { path: 'prepare-quotation', component: QuotationComponent },
    {
      path:'send-quotation',
      loadChildren:()=>import('./send-quote/send-quote.module').then(m=>m.SendQuoteModule)
    },
    {
      path:'update-quotation',
      loadChildren:()=>import('./update-quote/update-quote.module').then(m=>m.UpdateQuoteModule)
    },
    {
      path:'send-for-s&m',
      loadChildren:()=>import('./send-for-s&m/send-for-sm.module').then(m=>m.SendForSMQuoteModule)
    },
    { path: 'proforma-invoice', component: ProformaInvoiceComponent },
    { path: 's&m-approved', component: SMApprovedListComponent },
    { path: 'approved', component: ApprovedComponent },
    { path: 'perform-invoice', component: PerformInvoiceComponent },
    { path: 'update-proforma', component: UpdateProformaInvoiceComponent },
    // { path: 'signed-document', component: SignedDocumentComponent },
    {
      path:'signed-document',
      loadChildren:()=>import('./signed-document/signed-document.module').then(m=>m.SignedDocumentModule)
    },
    {
      path:'digital-signed-document',
      loadChildren:()=>import('./digitally-signed-document/digitally-signed-document.module').then(m=>m.DigitallySignedDocumentModule)
    },
    {
      path:'verify-signed-document',
      loadChildren:()=>import('./verify-signed-document/verify-signed-document.module').then(m=>m.VerifiedSignedDocumentModule)
    },
    {
      path:'sales-support',
      loadChildren:()=>import('./snm-head-approver/snm-head-approver.module').then(m=>m.SnMHeadModule)
    },
    {
      path:'fea-approvel',
      loadChildren:()=>import('./fea-approvel/fea-approvel.module').then(m=>m.FeaApprovelModule)
    },
    {
      path:'order-booking',
      loadChildren:()=>import('./order-booking/order-booking.module').then(m=>m.OrderBookingModule)
    },
    {
      path:'advance-payment',
      loadChildren:()=>import('./advance-payment/advance-payment.module').then(m=>m.AdvancePaymentModule)
    },
    {
      path:'S&M-head-Approval',
      loadChildren:()=>import('./snm-head-approval/snm-head-approval.module').then(m=>m.SnmHeadApprovalModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
