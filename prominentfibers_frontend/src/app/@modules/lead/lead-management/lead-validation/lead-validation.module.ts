import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadValidationRoutingModule } from './lead-validation-routing.module';
import { LeadValidationListComponent } from './lead-validation-list/lead-validation-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeadModule } from '../../lead.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
  declarations: [
    LeadValidationListComponent
  ],
  imports: [
    CommonModule,
    LeadValidationRoutingModule,
    MaterialModule,
    AgGridModule,
  
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
    MatSelectModule, 
    MatFormFieldModule,
    MatSelectFilterModule 
  ]
})
export class LeadValidationModule { }
