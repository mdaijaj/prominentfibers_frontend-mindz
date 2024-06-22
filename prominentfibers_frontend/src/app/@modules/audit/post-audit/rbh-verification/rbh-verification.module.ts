import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { RbhVerificationComponent } from './rbh-verification.component';
import { RbhVarificationRoutingModule } from './rbh-verification-routing.module';
import { RbhVerificationCheckComponent } from './rbh-verification-check/rbh-verification-check.component';
import { RbhVerificationActionComponent } from './rbh-verification-action/rbh-verification-action.component';



@NgModule({
  declarations: [RbhVerificationComponent, RbhVerificationCheckComponent, RbhVerificationActionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule,
    ReactiveFormsModule,
    ShairedModule,
    FormsModule,
    RbhVarificationRoutingModule
  ]
})
export class RbhVerificationModule { }


