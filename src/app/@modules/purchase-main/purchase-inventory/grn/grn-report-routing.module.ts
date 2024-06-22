import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnReportComponent } from './grn-report/grn-report.component';
import { GenrateGrnComponent } from './genrate-grn/genrate-grn.component';
import { PoListDetailsComponent } from './po-list-details/po-list-details.component';


const routes: Routes = [
  { path: "", component: GrnReportComponent},
  {path:"genrate-grn", component:GenrateGrnComponent},
  {path:"POList-Details",component:PoListDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GRNRoutingModule { }