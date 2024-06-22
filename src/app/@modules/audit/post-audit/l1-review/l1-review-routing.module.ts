import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { L1ReviewListComponent } from './l1-review-list/l1-review-list.component';
import { L1ReviewerComponent } from './l1-reviewer/l1-reviewer.component';

const routes: Routes = [
  {path:'',component:L1ReviewListComponent},
  {path:'l1-reviewer',component:L1ReviewerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class L1ReviewRoutingModule { }
