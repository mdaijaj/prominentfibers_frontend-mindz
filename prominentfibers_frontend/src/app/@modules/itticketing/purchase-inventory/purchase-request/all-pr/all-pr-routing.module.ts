import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPrComponent } from './all-pr.component';
import { CreatePrComponent } from './create-pr/create-pr.component';

const routes: Routes = [
  { path: "", component: AllPrComponent},
  {path:"create-pr", component:CreatePrComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPrRoutingModule { }
