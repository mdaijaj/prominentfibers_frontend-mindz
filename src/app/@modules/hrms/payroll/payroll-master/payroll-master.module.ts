import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollMasterRoutingModule } from './payroll-master-routing.module';
import { PayrollMasterComponent } from './payroll-master.component';
import { PayrollComponentComponent } from './add-component-type/payroll-component/payroll-component.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { ItrComponent } from './itr/itr.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { PfEsiComponent } from './pf-esi/pf-esi.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddComponentTypeComponent } from './add-component-type/add-component-type.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { EsiComponent } from './esi/esi.component';
import { AddTypeActionComponent } from './add-component-type/add-type-action/add-type-action.component';
import { AddActionComponent } from './add-component/add-action/add-action.component';
import { PfActionComponent } from './pf-esi/pf-action/pf-action.component';
import { EsiActionComponent } from './esi/esi-action/esi-action.component';
import { ConfigrationActionComponent } from './configuration/configration-action/configration-action.component';
import { AddTypeCreateComponent } from './add-type-create/add-type-create.component';
import { AddCreateComponent } from './add-create/add-create.component';
import { PfCreateComponent } from './add-component-type/pf-create/pf-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTypeDilogComponent } from './add-component-type/add-type-dilog/add-type-dilog.component';
import { AddDilogComponent } from './add-component/add-dilog/add-dilog.component';
import { PfDilogComponent } from './pf-esi/pf-dilog/pf-dilog.component';
import { EsiCreateComponent } from './esi-create/esi-create.component';
import { EsiDilogComponent } from './esi/esi-dilog/esi-dilog.component';
import { ConfigurationCreateComponent } from './configuration-create/configuration-create.component';
import { ConfigureDilogComponent } from './configuration-create/configure-dilog/configure-dilog.component';
import { SalaryActionComponent } from './employee-salary/salary-action/salary-action.component';
import { ReportGenerateComponent } from './report-generate/report-generate.component';
import { EmployeeConfigureComponent } from './employee-configure/employee-configure.component';
import { CompoFilterPipe } from 'src/app/@shared/pipe/filterPipes/compo-filter.pipe';
import { ViewConfigDilogComponent } from './configuration/view-config-dilog/view-config-dilog.component';
import { ItrDilogComponent } from './itr-deduction/itr-dilog/itr-dilog.component';
import { ItrActionComponent } from './itr-deduction/itr-action/itr-action.component';
import { ItrDeductionComponent } from './itr-deduction/itr-deduction.component';
import { OtherDeductionComponent } from './other-deduction/other-deduction.component';
import { OtherAllowanceComponent } from './other-allowance/other-allowance.component';
import { VariableComponent } from './variable/variable.component';
import { ItrAllowanceActionComponent } from './other-allowance/itr-allowance-action/itr-allowance-action.component';
import { ItrAllowanceDilogComponent } from './other-allowance/itr-allowance-dilog/itr-allowance-dilog.component';
import { VariableActionComponent } from './variable/variable-action/variable-action.component';
import { VariableDilogComponent } from './variable/variable-dilog/variable-dilog.component';
import { OtherDeducActionComponent } from './other-deduction/other-deduc-action/other-deduc-action.component';
import { OtherDeducDilogComponent } from './other-deduction/other-deduc-dilog/other-deduc-dilog.component';
import { GeneratePaySlipComponent } from './generate-pay-slip/generate-pay-slip.component';
import { ProcessComponent } from './process/process.component';
import { SalaryProcessListComponent } from './salary-process-list/salary-process-list.component';
import { SalaryIncrementComponent } from './salary-increment/salary-increment.component';
import { PaySlipDilogComponent } from './generate-pay-slip/pay-slip-dilog/pay-slip-dilog.component';
import { SalaryUploadDilogComponent } from './process/salary-upload-dilog/salary-upload-dilog.component';
import { SalaryIncrementListComponent } from './salary-increment-list/salary-increment-list.component';
@NgModule({
  declarations: [
    // PayrollMasterComponent,
    // PayrollComponentComponent,
    // EmployeeSalaryComponent,
    // SalaryProcessComponent,
    // PayrollReportComponent,
    // ItrComponent,
    // ConfigurationComponent,
    // PfEsiComponent,
    // AddComponentComponent,
    // AddComponentTypeComponent,
    // EsiComponent,
    // AddTypeActionComponent,
    // AddActionComponent,
    // PfActionComponent,
    // EsiActionComponent,
    // ConfigrationActionComponent,
    // AddTypeCreateComponent,
    // AddCreateComponent,
    // PfCreateComponent,
    // AddTypeDilogComponent,
    // AddDilogComponent,
    // PfDilogComponent,
    // EsiCreateComponent,
    // EsiDilogComponent,
    // ConfigurationCreateComponent,
    // ConfigureDilogComponent,
    // SalaryActionComponent,
    // ReportGenerateComponent,
    // EmployeeConfigureComponent,
    // CompoFilterPipe,
    // ViewConfigDilogComponent,
    // ItrDilogComponent,
    // ItrActionComponent,
    // ItrDeductionComponent,
    // OtherDeductionComponent,
    // OtherAllowanceComponent,
    // VariableComponent,
    // ItrAllowanceActionComponent,
    // ItrAllowanceDilogComponent,
    // VariableActionComponent,
    // VariableDilogComponent,
    // OtherDeducActionComponent,
    // OtherDeducDilogComponent,
    // GeneratePaySlipComponent,
    // ProcessComponent,
    // SalaryProcessListComponent,
    // SalaryIncrementComponent,
    // PaySlipDilogComponent,
    // SalaryUploadDilogComponent,
    // SalaryIncrementListComponent,
    // OtherAllowanceComponent,

  ],
  imports: [
    // CommonModule,
    // PayrollMasterRoutingModule,
    // AgGridModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCardModule,
    // MaterialModule,
    // ReactiveFormsModule,
    // FormsModule
  ]
})
export class PayrollMasterModule { }
