import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostedComponent } from './posted/posted.component';
import { PostedListComponent } from './posted-list/posted-list.component';

const routes: Routes = [
  {path:'',redirectTo:'posted-list',pathMatch:'full'},
  {path:'posted-list',component:PostedListComponent},
  {path:'posted',component:PostedComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostedRoutingModule { }
