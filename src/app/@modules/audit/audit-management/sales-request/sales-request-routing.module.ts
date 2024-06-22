import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesRequestComponent } from './sales-request.component';
import { BookauditorComponent } from './bookauditor/bookauditor.component';

const routes: Routes = [
  {path:'',component:SalesRequestComponent},
  {path:'bookauditor',component:BookauditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRequestRoutingModule { }
