import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentBudgetRoutingModule } from './department-budget-routing.module';
import { DepartmentBudgetComponent } from './department-budget.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './action/action.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { TrainingViewComponent } from './training-view/training-view.component';
import { RescheduleViewComponent } from './reschedule-view/reschedule-view.component';


@NgModule({
  declarations: [
    DepartmentBudgetComponent,
    ActionComponent,
    CreateBudgetComponent,
    TrainingViewComponent,
    RescheduleViewComponent
  ],
  imports: [
    CommonModule,
    DepartmentBudgetRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class DepartmentBudgetModule { }
