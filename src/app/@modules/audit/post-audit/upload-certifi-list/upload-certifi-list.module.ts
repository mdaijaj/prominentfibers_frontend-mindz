import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadCertifiListRoutingModule } from './upload-certifi-list-routing.module';
import { UploadCertifiListComponent } from './upload-certifi-list/upload-certifi-list.component';
import { VerifyDqsDataComponent } from './verify-dqs-data/verify-dqs-data.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadVerifyCsvPopupComponent } from './upload-csv-popup/upload-verify-csv-popup.component';


@NgModule({
  declarations: [
    UploadCertifiListComponent,
    VerifyDqsDataComponent,
    UploadVerifyCsvPopupComponent
  ],
  imports: [
    CommonModule,
    UploadCertifiListRoutingModule,
    AgGridModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UploadCertifiListModule { }
