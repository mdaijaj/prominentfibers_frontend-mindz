import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PuchaseOrderActionComponent } from './puchase-order-action/puchase-order-action.component';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { PurchaseOrderMainComponent } from './purchase-order-main/purchase-order-main.component';
import { BillingBranchListComponent } from './billing-branch-list/billing-branch-list.component';
import { CreatePoComponent } from './billing-branch-list/create-po/create-po.component';
import { PoStatusDialogComponent } from './po-status-dialog/po-status-dialog.component';



@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PuchaseOrderActionComponent,
    PurchaseOrderMainComponent,
    BillingBranchListComponent,
    CreatePoComponent,
    PoStatusDialogComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PurchaseOrderModule { }
