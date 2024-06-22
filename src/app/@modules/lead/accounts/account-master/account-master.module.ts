import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountMasterRoutingModule } from './account-master-routing.module';
import { AccountMasterComponent } from './account-master.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { AccountMasterActionComponent } from './account-master-action/account-master-action.component';

@NgModule({
  declarations: [
    AccountMasterComponent,
    AccountMasterActionComponent
  ],
  imports: [
    CommonModule,
    AccountMasterRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AgGridModule, 
    CKEditorModule
  ]
})
export class AccountMasterModule { }
