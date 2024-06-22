import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { L1ReviewRoutingModule } from './l1-review-routing.module';
import { L1ReviewListComponent } from './l1-review-list/l1-review-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { L1ReviewerComponent } from './l1-reviewer/l1-reviewer.component';
import { UploadReviewCsvComponent } from './upload-review-csv/upload-review-csv.component';
// import { UploadReviewCsvComponent } from './upload-review-csv/upload-review-csv.component';


@NgModule({
  declarations: [
    L1ReviewListComponent,
    L1ReviewerComponent,
    UploadReviewCsvComponent
  ],
  imports: [
    CommonModule,
    L1ReviewRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    ShairedModule
  ]
})
export class L1ReviewModule { }
