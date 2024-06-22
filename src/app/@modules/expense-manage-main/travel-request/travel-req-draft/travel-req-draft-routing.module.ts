import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftTravelListComponent } from './draft-travel-list/draft-travel-list.component';
import { DraftTravelUpdateComponent } from './draft-travel-update/draft-travel-update.component';

const routes: Routes = [
  {path:'',component:DraftTravelListComponent},
  {path:'draft-travel-update',component:DraftTravelUpdateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelReqDraftRoutingModule { }
