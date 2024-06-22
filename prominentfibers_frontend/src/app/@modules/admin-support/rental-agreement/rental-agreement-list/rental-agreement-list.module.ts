import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalAgreementListRoutingModule } from './rental-agreement-list-routing.module';
import { RentalAgreementListComponent } from './rental-agreement-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { RentalActionComponent } from './rental-action/rental-action.component';
import { RentalDailogComponent } from './rental-dailog/rental-dailog.component';


@NgModule({
  declarations: [
    RentalAgreementListComponent,
    RentalActionComponent,
    RentalDailogComponent
  ],
  imports: [
    CommonModule,
    RentalAgreementListRoutingModule,
    AgGridModule,
    MaterialModule
  ]
})
export class RentalAgreementListModule { }
