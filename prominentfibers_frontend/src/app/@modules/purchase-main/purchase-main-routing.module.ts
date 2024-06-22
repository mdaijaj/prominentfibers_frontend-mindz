import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseMainComponent } from './purchase-main.component';

const routes: Routes = [
  {path:'',component:PurchaseMainComponent,
  children: [
    // {
    //   path: '', redirectTo: 'employee-master', pathMatch: 'full'
    // },

    {
      path: '',
      loadChildren: () =>
        import('./purchase-inventory/purchase-inventory.module').then(
          (m) => m.PurchaseInventoryModule
        ),
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseMainRoutingModule { }
