import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalReviewRoutingModule } from './technical-review-routing.module';
import { TechreviewAuditVerficationComponent } from './techreview-audit-verfication/techreview-audit-verfication.component';
import { UpdatetechreviewRelatedComponent } from './updatetechreview-related/updatetechreview-related.component';
import { TechreviewAudiListComponent } from './techreview-audi-list/techreview-audi-list.component';

import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';

@NgModule({
  declarations: [
    TechreviewAuditVerficationComponent,
    UpdatetechreviewRelatedComponent,
    TechreviewAudiListComponent
  ],
  imports: [
    CommonModule,
    TechnicalReviewRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,FormsModule
  ]
})
export class TechnicalReviewModule { }
