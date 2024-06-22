import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryProcessRoutingModule } from './salary-process-routing.module';
import { SalaryProcessComponent } from './salary-process.component';
import { ProcessComponent } from './process/process.component';
import { SalaryUploadDilogComponent } from './process/salary-upload-dilog/salary-upload-dilog.component';
import { GeneratePaySlipComponent } from './generate-pay-slip/generate-pay-slip.component';
import { PaySlipComponent } from '../../employee-master/pay-slip/pay-slip.component';
import { PaySlipDilogComponent } from './generate-pay-slip/pay-slip-dilog/pay-slip-dilog.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { SalaryProcessListComponent } from './salary-process-list/salary-process-list.component';


@NgModule({
  declarations: [
    SalaryProcessComponent,
    ProcessComponent,
    SalaryUploadDilogComponent,
    GeneratePaySlipComponent,
    // PaySlipComponent,
    SalaryProcessComponent,
    PaySlipDilogComponent,
    SalaryProcessListComponent
  ],
  imports: [
    CommonModule,
    SalaryProcessRoutingModule,
    AgGridModule,
    MaterialModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
  
  
  ]
})
export class SalaryProcessModule { }
