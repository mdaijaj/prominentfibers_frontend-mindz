import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierRedirectComponent } from './courier-redirect.component';

const routes: Routes = [
   { path:'', component: CourierRedirectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierRedirectRoutingModule { }
