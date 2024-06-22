import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryProcessComponent } from './salary-process.component';
import { GeneratePaySlipComponent } from '../generate-pay-slip/generate-pay-slip.component';
import { ProcessComponent } from '../process/process.component';
import { SalaryProcessListComponent } from '../salary-process-list/salary-process-list.component';
import { SalaryIncrementComponent } from '../salary-increment/salary-increment.component';
import { SalaryIncrementListComponent } from '../salary-increment-list/salary-increment-list.component';

const routes: Routes = [
//   {path:'', component:SalaryProcessComponent,
//   children: [
//     {
//       path: '', redirectTo: 'generate-pay-slip', pathMatch: 'full'
//     },
//     {
//       path:'generate-pay-slip', component:GeneratePaySlipComponent
//     },
//     {
//       path:'process', component:ProcessComponent
//     },
//     {
//       path:'list', component:SalaryProcessListComponent
//     },
   
//     {
//       path:'salary-increment', component:SalaryIncrementComponent
//     },
//     {
//       path:'salary-increment-list', component:SalaryIncrementListComponent
//     },
//   ]
// },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryProcessRoutingModule { }
