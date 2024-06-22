import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestFormResComponent } from './request-form-res/request-form-res.component';
import { RequestFormComponent } from './request-form/request-form.component';

const routes: Routes = [
    { path: '', component: RequestFormComponent},
    { path: 'form-sent', component: RequestFormResComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
