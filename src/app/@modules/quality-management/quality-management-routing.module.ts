import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityManagementComponent } from './quality-management.component';
import { QualityCheckComponent } from './quality-check/quality-check.component';
import { UpdateQualityCheckComponent } from './quality-check/update-quality-check/update-quality-check.component';
import { QualityCheckChartComponent } from './quality-check/quality-check-chart/quality-check-chart.component';
 


const routes: Routes = [
{
  path:'',component:QualityManagementComponent,children:[
  {path:'quality-check/quality-check-list',component:QualityCheckComponent},
  {path:'update-quality-check',component:UpdateQualityCheckComponent},
  {path:'view-quality-chart',component:QualityCheckChartComponent},

]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityManagementRoutingModule { }
