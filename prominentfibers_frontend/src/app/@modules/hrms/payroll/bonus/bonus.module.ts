import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRoutingModule } from './bonus-routing.module';
import { BonusComponent } from './bonus.component';
import { EmployeeBonusComponent } from './employee-bonus/employee-bonus.component';
import { BonusConfigureComponent } from './bonus-configure/bonus-configure.component';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeBonusActionComponent } from './employee-bonus/employee-bonus-action/employee-bonus-action.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeBonusCreateComponent } from './employee-bonus-create/employee-bonus-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BonusConfigureActionComponent } from './bonus-configure/bonus-configure-action/bonus-configure-action.component';
import { BonusConfigureCreateComponent } from './bonus-configure-create/bonus-configure-create.component';
import { BonusConfigDilogComponent } from './bonus-configure/bonus-config-dilog/bonus-config-dilog.component';
import { EmpBonusDilogComponent } from './employee-bonus/emp-bonus-dilog/emp-bonus-dilog.component';
import { BonusEmpFilterPipe } from 'src/app/@shared/pipe/filterPipes/bonus-emp-filter.pipe';
import { DateAdapter } from 'angular-calendar';
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    BonusComponent,
    EmployeeBonusComponent,
    BonusConfigureComponent,
    EmployeeBonusActionComponent,
    EmployeeBonusCreateComponent,
    BonusConfigureActionComponent,
    BonusConfigureCreateComponent,
    BonusConfigDilogComponent,
    EmpBonusDilogComponent,
    BonusEmpFilterPipe
  ],
  
  imports: [
    CommonModule,
    BonusRoutingModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
      
    ],

  
})
export class BonusModule { }
