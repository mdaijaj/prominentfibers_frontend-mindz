import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechreviewAudiListComponent } from './techreview-audi-list/techreview-audi-list.component';
import { TechreviewAuditVerficationComponent } from './techreview-audit-verfication/techreview-audit-verfication.component';

const routes: Routes = [
  {path:'', component:TechreviewAudiListComponent},
  {path:'techreview-audit-verification', component:TechreviewAuditVerficationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicalReviewRoutingModule { }
