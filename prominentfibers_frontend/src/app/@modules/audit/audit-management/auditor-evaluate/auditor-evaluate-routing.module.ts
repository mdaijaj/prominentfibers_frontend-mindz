import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditorEvaluateComponent } from './auditor-evaluate.component';
import { EvaluationSummaryComponent } from './evaluation-summary/evaluation-summary.component';

const routes: Routes = [
  {path:'',component:AuditorEvaluateComponent},
  {path:'evaluation_summary',component:EvaluationSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditorEvaluateRoutingModule { }
