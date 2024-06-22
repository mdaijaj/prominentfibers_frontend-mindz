import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletenessCheckRoutingModule } from './completeness-check-routing.module';
import { CompletenessCheckListComponent } from './completeness-check-list/completeness-check-list.component';
import { CompletenessCheckComponent } from './completeness-check/completeness-check.component';
import { CompletenessCheckActionComponent } from './completeness-check-action/completeness-check-action.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';


@NgModule({
  declarations: [
    CompletenessCheckListComponent,
    CompletenessCheckComponent,
    CompletenessCheckActionComponent
  ],
  imports: [
    CommonModule,
    CompletenessCheckRoutingModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,FormsModule
  ]
})
export class CompletenessCheckModule { }
