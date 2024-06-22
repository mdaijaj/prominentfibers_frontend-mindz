import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseComponent } from './warehouse.component';
import { warehouseListComponent } from './sections/warehouseList/warehouseList.component';
import { addhouseComponent } from './sections/addhouse/addhouse.component';
// import { warehouseCreateComponent } from './sections/product-master-action/warehouse-create/warehouse-create.component'; 
import { WarehouseCreateComponent } from './sections/warehouse-create/warehouse-create.component';
import { BayManagementComponent } from './sections/bay-management/bay-management.component';
import { BlockManagementComponent } from './sections/block-management/block-management.component';
import { BayBlockTableComponent } from './sections/Bay-block-table/bay-block-table.component';
import { FGListComponent } from './sections/fg-list/fg-list.component';
import { SalesOrderListComponent } from './sections/sales-order-list/sales-order-list.component';
import { PartiallyAllocatedComponent } from './sections/partially-allocated/partially-allocated.component';
import { DoListComponent } from './sections/do-list/do-list.component';
import { salesOrderFormComponent } from './sections/sales-order-list/sales-order-form/sales-order-form.component';
import { partiallyAllocatedFormComponent } from './sections/partially-allocated/partially-allocated-form/partially-allocated-form.component';
import { DoListFormComponent } from './sections/do-list/do-list-form/do-list-form.component';
import { DispatchListComponent } from './sections/dispatch-list/dispatch-list.component';
import { DispatchedProductComponent } from './sections/dispatch-list/dispatched-product/dispatched-product.component';
import { DispatchListFormComponent } from './sections/dispatch-list/dispatch-list-form/dispatch-list-form.component';








const routes: Routes = [
  {
    path: '', component: WarehouseComponent,
    children: [
      {
        path: '',
        component: warehouseListComponent
      },
      {
        path: 'warehouse-list/warehouse-list',
        component: warehouseListComponent,
      },
      {
        path: 'addhouse',
        component: addhouseComponent,
      },
      {
        path: 'warehouse-create',
        component: WarehouseCreateComponent
      },
      {
        path: 'bay-management',
        component: BayManagementComponent
      },
      {
        path: 'rack-bay-management/rach-bay-management',
        component: BayBlockTableComponent
      },
      {
        path: 'total-fg/total-fg-list',
        component: FGListComponent 
      },
      {
        path: 'sales-order/sales-order-list',
        component: SalesOrderListComponent
      },
      {
        path: 'sales-order/partially-allocated',
        component: PartiallyAllocatedComponent
      },
      {
        path: 'sales-order/do-list',
        component: DoListComponent
      },
      {
        path: 'block-portal',
        component: BlockManagementComponent
      },
      {
        path: 'sales-order-form',
        component: salesOrderFormComponent
      },
      {
        path: 'partially-allocated-form',
        component: partiallyAllocatedFormComponent
      },
      {
        path: 'do-list-form',
        component: DoListFormComponent
      },
      {
        path: 'dispatch-list/dispatch-list',
        component: DispatchListComponent
      },
      {
        path: 'dispatched-product/dispatched-product',
        component: DispatchedProductComponent
      },
      {
        path: 'dispatch-list-form',
        component: DispatchListFormComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }