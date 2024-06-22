import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { AddWorkFlowComponent } from './add-work-flow/add-work-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowActionComponent } from './work-flow-action/work-flow-action.component';
import { ViewWorkFlowComponent } from './view-work-flow/view-work-flow.component';

@NgModule({
  declarations: [
    AddWorkFlowComponent,
     WorkFlowComponent,
      WorkFlowActionComponent,
      ViewWorkFlowComponent
    ],
  imports: [
    CommonModule,
    WorkFlowRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatSelectFilterModule,
    AgGridModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatTooltipModule,
     
  ],
})
export class WorkFlowModule {}
