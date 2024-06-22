import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HkSecurityAgreementListRoutingModule } from './hk-security-agreement-list-routing.module';
import { HkSecurityAgreementListComponent } from './hk-security-agreement-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HksActionComponent } from './hks-action/hks-action.component';
import { HksDailogComponent } from './hks-dailog/hks-dailog.component';


@NgModule({
  declarations: [
    HkSecurityAgreementListComponent,
    HksActionComponent,
    HksDailogComponent
  ],
  imports: [
    CommonModule,
    HkSecurityAgreementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class HkSecurityAgreementListModule { }
