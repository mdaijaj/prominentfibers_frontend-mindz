import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceAgreementListRoutingModule } from './insurance-agreement-list-routing.module';
import { InsuranceAgreementListComponent } from './insurance-agreement-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { InsuranceDailogComponent } from './insurance-dailog/insurance-dailog.component';
import { InsuranceActionComponent } from './insurance-action/insurance-action.component';

@NgModule({
  declarations: [
    InsuranceAgreementListComponent,
    InsuranceDailogComponent,
    InsuranceActionComponent
  ],
  imports: [
    CommonModule,
    InsuranceAgreementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class InsuranceAgreementListModule { }
