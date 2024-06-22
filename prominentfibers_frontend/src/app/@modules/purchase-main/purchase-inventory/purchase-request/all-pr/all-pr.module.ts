import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllPrRoutingModule } from './all-pr-routing.module';
import { AllPrComponent } from './all-pr.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AllPrActionComponent } from './all-pr-action/all-pr-action.component';
import { AllPrDilogComponent } from './all-pr-dilog/all-pr-dilog.component';
import { PrStatusDilogComponent } from './pr-status-dilog/pr-status-dilog.component';
import { CreatePrComponent } from './create-pr/create-pr.component';
import { AddProductDilogComponent } from './add-product-dilog/add-product-dilog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServiceDialogComponent } from './add-service-dialog/add-service-dialog.component';
import { AddBomDialogComponent } from './add-bom-dialog/add-bom-dialog.component';


@NgModule({
  declarations: [
    AllPrComponent,
    AllPrActionComponent,
    AllPrDilogComponent,
    PrStatusDilogComponent,
    CreatePrComponent,
    AddProductDilogComponent,
    AddServiceDialogComponent,
    AddBomDialogComponent
  ],
  imports: [
    CommonModule,
    AllPrRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AllPrModule { }
