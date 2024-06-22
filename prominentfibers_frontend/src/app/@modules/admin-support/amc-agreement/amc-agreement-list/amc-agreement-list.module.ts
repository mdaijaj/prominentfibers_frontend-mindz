import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';

import { AmcAgreementListRoutingModule } from './amc-agreement-list-routing.module';
import { AmcAgreementListComponent } from './amc-agreement-list.component';
import { AmcDailogComponent } from './amc-dailog/amc-dailog.component';
import { AmcActionComponent } from './amc-action/amc-action.component';


@NgModule({
  declarations: [
    AmcAgreementListComponent,
    AmcDailogComponent,
    AmcActionComponent
  ],
  imports: [
    CommonModule,
    AmcAgreementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class AmcAgreementListModule { }
