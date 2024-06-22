import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterCompanyHomeComponent } from './inter-company-home/inter-company-home.component';

const routes: Routes = [
    { path: '', component: InterCompanyHomeComponent },
    {
      path:'rise-request',
      loadChildren:()=>import('./rise-request/rise-request.module').then(m=>m.RiseRequestModule)
    },
    {
      path:'receive-request',
      loadChildren:()=>import('./received-request/receive-request.module').then(m=>m.ReceiveRequestModule)
    },
    {
      path:'update-quote',
      loadChildren:()=>import('./work-order-dup/update-quote.module').then(m=>m.UpdateQuoteModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterCompanyRoutingModule { }
