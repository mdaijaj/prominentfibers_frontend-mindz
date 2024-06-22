import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseInventoryRoutingModule } from './purchase-inventory-routing.module';
import { PurchaseInventoryComponent } from '../purchase-inventory/purchase-inventory.component';
import { ApprovedVendorListComponent } from './approved-vendor-list/approved-vendor-list.component';
import { UnapprovedVendorListComponent } from './unapproved-vendor-list/unapproved-vendor-list.component';
import { VendorManagementComponent } from './vendor-management/vendor-management.component';
import { AgGridModule } from 'ag-grid-angular';
import { ActiveStatusComponent } from './unapproved-vendor-list/active-status/active-status.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ActionComponent } from './unapproved-vendor-list/action/action.component';
import { ActionApprovedComponent } from './approved-vendor-list/action/action.component';
import { ActiveApprovedStatusComponent } from './approved-vendor-list/active-status/active-status.component';
import { CreateVandorComponent } from './create-vandor/create-vandor.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { HttpClientModule } from '@angular/common/http';
import { BankActionComponent } from './bank-details/bank-action/bank-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorDilogComponent } from './unapproved-vendor-list/vendor-dilog/vendor-dilog.component';
import { VendorDilogComponentApp } from './approved-vendor-list/vendor-dilog/vendor-dilog.component';
import { RejectRemarkComponent } from './reject-remark/reject-remark.component';
import { DepartmentBudgetModule } from './department-budget/department-budget.module';
@NgModule({
  declarations: [
    PurchaseInventoryComponent,
    ApprovedVendorListComponent,
    UnapprovedVendorListComponent,
    VendorManagementComponent,
    ActiveStatusComponent,
    ActionComponent,
    ActionApprovedComponent,
    ActiveApprovedStatusComponent,
    CreateVandorComponent,
    BankDetailsComponent,
    BasicDetailsComponent,
    DocumentsComponent,
    BankActionComponent,
    VendorDilogComponent,
    VendorDilogComponentApp,
    RejectRemarkComponent,
  ],
  imports: [
    CommonModule,
    PurchaseInventoryRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentBudgetModule
  ]
})
export class PurchaseInventoryModule { }
