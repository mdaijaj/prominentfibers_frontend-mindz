import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostAuditRoutingModule } from './post-audit-routing.module';
import { PostAuditComponent } from './post-audit.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { UploadedCertificatesComponent } from './uploaded-certificates/uploaded-certificates.component';
import { VerifyDqsDataComponent } from './upload-certifi-list/verify-dqs-data/verify-dqs-data.component';
import { VerifiedDQSDataComponent } from './verified-dqs-data/verified-dqs-data.component';
import { TechnicalReviewComponent } from './technical-review/technical-review.component';


@NgModule({
  declarations: [
    PostAuditComponent,
    UploadedCertificatesComponent,
    VerifiedDQSDataComponent,
    TechnicalReviewComponent
  ],
  imports: [
    CommonModule,
    PostAuditRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    ShairedModule
  ]
})
export class PostAuditModule { }
