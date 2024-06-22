import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadCertifiListComponent } from './upload-certifi-list/upload-certifi-list.component';
import { VerifyDqsDataComponent } from './verify-dqs-data/verify-dqs-data.component';

const routes: Routes = [
  {path:'',component:UploadCertifiListComponent},
  {path:'verify-dqs_data',component:VerifyDqsDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadCertifiListRoutingModule { }
