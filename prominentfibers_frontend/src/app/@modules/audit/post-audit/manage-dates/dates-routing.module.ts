import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatesCreateComponent } from './create-dates/create.dates.component';
import { ListDatesComponent } from './list-dates/list-dates.component';

const routes: Routes = [
   { path: '', component: ListDatesComponent },
   { path: 'create-dates', component: DatesCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadDatesRoutingModule { }
