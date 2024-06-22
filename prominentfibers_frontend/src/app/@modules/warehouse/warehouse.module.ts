import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HrmsModule } from '../hrms/hrms.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { CKEditorModule } from 'ckeditor4-angular';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { AssignUserModule } from '../crm/assign-user/assign-user.module';
import { addhouseComponent } from './sections/addhouse/addhouse.component';
import { warehouseListComponent } from './sections/warehouseList/warehouseList.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectFilterModule } from 'mat-select-filter';
import { WarehouseStatusComponent } from './sections/warehouse-action/warehouse-status/warehouse-status.component';
import { WarehouseActionComponent } from './sections/warehouse-action/warehouse-action.component';
import { WarehouseCreateComponent } from './sections/warehouse-create/warehouse-create.component';
import { BayManagementComponent } from './sections/bay-management/bay-management.component';
import { BlockManagementComponent } from './sections/block-management/block-management.component';
import { BlockActionComponent } from './sections/block-action/block-action.component';
import { BayActionComponent } from './sections/bay-action/bay-action.component';
import { BayBlockTableComponent } from './sections/Bay-block-table/bay-block-table.component';
import { BayRowTextFieldComponent } from './sections/bay-row-text-field/bay-row-text-field.component';
import { BlockRowTextFieldComponent } from './sections/block-row-text-field/block-row-text-field.component';
import { FGListComponent } from './sections/fg-list/fg-list.component';
import { SalesOrderListComponent } from './sections/sales-order-list/sales-order-list.component';
import { PartiallyAllocatedComponent } from './sections/partially-allocated/partially-allocated.component';
import { DoListComponent } from './sections/do-list/do-list.component';
import { SalesOrderActionComponent } from './sections/sales-order-list/sales-order-action/sales-order-action.component';
import { PartiallyAllocatedActionComponent } from './sections/partially-allocated/partially-allocated-action/partially-allocated-action.component';
import { DoListActionComponent } from './sections/do-list/do-list-action/do-list-action.component';
import { salesOrderFormComponent } from './sections/sales-order-list/sales-order-form/sales-order-form.component';
import { SalesOrderFormActionComponent } from './sections/sales-order-list/sales-order-form/sales-order-form-action/sales-order-form-action.component';
import { PartiallyAllocatedFormActionComponent } from './sections/partially-allocated/partially-allocated-form/partially-allocated-form-action/partially-allocated-form-action.component';
import { partiallyAllocatedFormComponent } from './sections/partially-allocated/partially-allocated-form/partially-allocated-form.component';
import { DoListFormComponent } from './sections/do-list/do-list-form/do-list-form.component';
import { DoListFormActionComponent } from './sections/do-list/do-list-form/do-list-form-action/do-list-form-action.component';
import { SalesOrderFormDialogComponent } from './sections/sales-order-list/sales-order-form/sales-order-form-dialog/sales-order-form-dialog.component';
import { DispatchListComponent } from './sections/dispatch-list/dispatch-list.component';
import {  DispatchedProductComponent } from './sections/dispatch-list/dispatched-product/dispatched-product.component';
import { DispatchListFormComponent } from './sections/dispatch-list/dispatch-list-form/dispatch-list-form.component';
import { DispatchListActionComponent } from './sections/dispatch-list/dispatch-list-action/dispatch-list-action.component';
import { DispatchListFormDialogComponent } from './sections/dispatch-list/dispatch-list-form/dispatch-list-form-dialog/dispatch-list-form-dialog.component';
import { DispatchListFormActionComponent } from './sections/dispatch-list/dispatch-list-form/dispatch-list-form-action/dispatch-list-form-action.component';
@NgModule({
  declarations: [
    WarehouseComponent,
    addhouseComponent,
    warehouseListComponent,
    WarehouseStatusComponent,
    WarehouseActionComponent,
    WarehouseCreateComponent,
    BayManagementComponent,
    BlockManagementComponent,
    BlockActionComponent,
    BayActionComponent,
    BayBlockTableComponent,
    BayRowTextFieldComponent,
    BlockRowTextFieldComponent,
    FGListComponent,
    SalesOrderListComponent,
    PartiallyAllocatedComponent,
    DoListComponent,
    SalesOrderActionComponent,
    PartiallyAllocatedActionComponent,
    DoListActionComponent,
    salesOrderFormComponent,
    SalesOrderFormActionComponent,
    PartiallyAllocatedFormActionComponent,
    partiallyAllocatedFormComponent,
    DoListFormComponent,
    DoListFormActionComponent,
    SalesOrderFormDialogComponent,
    DispatchListComponent,
    DispatchedProductComponent,
    DispatchListFormComponent,
    DispatchListActionComponent,
    DispatchListFormDialogComponent,
    DispatchListFormActionComponent
  ],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
    MatButtonModule,
    MatSelectFilterModule,
    MaterialModule,
    HrmsModule,
    AgGridModule,
    MatSlideToggleModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ShairedModule,
    CKEditorModule,
    AssignUserModule,
    MatTabsModule,
  ]
})
export class WarehouseModule { }
