import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenHouseComponent } from './open-house-training-create/open-house-training.component';
import { OpenHouseListComponent } from './open-house-training-list/open-house-training-list.component';
import { RevenueListComponent } from './revenue-list/revenue-list.component';

const routes: Routes = [
    { path: '', component: OpenHouseListComponent },
    { path: 'create-training', component: OpenHouseComponent },
    { path: 'revenue-list', component: RevenueListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenHouseRoutingModule { }
