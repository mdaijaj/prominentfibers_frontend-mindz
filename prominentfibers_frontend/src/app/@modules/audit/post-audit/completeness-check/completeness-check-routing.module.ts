import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletenessCheckListComponent } from './completeness-check-list/completeness-check-list.component';
import { CompletenessCheckComponent } from './completeness-check/completeness-check.component';

const routes: Routes = [
  {path:'', component:CompletenessCheckListComponent},
  {path:'completness-create',component:CompletenessCheckComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompletenessCheckRoutingModule { }
