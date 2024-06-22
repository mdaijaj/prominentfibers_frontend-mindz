import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseMainRoutingModule } from './purchase-main-routing.module';
import { PurchaseMainComponent } from './purchase-main.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { DMSModule } from '../hrms/dms/dms.module';


@NgModule({
  declarations: [
    PurchaseMainComponent
  ],
  imports: [
    CommonModule,
    PurchaseMainRoutingModule,
    MaterialModule,
        AgGridModule,
        CKEditorModule,
        DMSModule,
        ShairedModule,
  ]
})
export class PurchaseMainModule { }
