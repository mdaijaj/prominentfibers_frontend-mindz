import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessingComponent } from './processing/processing.component';
import { ProcessingListComponent } from './processing-list/processing-list.component';

const routes: Routes = [
  {path:'',redirectTo:'processing-list',pathMatch:'full'},
  {path:'processing-list',component:ProcessingListComponent},

  {path:'processing',component:ProcessingComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessingRoutingModule { }
