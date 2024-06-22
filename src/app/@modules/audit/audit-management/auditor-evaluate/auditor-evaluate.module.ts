

import { AuditorEvaluateRoutingModule } from './auditor-evaluate-routing.module';
import { AuditorEvaluateComponent } from './auditor-evaluate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { EvaluationSummaryComponent } from './evaluation-summary/evaluation-summary.component';



@NgModule({
  declarations: [
    AuditorEvaluateComponent,
    EvaluationSummaryComponent
  ],
  imports: [
    CommonModule,
    AuditorEvaluateRoutingModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ShairedModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class AuditorEvaluateModule { }
