import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCreateComponent } from './create-upload/create.upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';

const routes: Routes = [
    { path: '', component: ListUploadComponent },
    { path: 'create-upload', component: UploadCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadUploadRoutingModule { }
