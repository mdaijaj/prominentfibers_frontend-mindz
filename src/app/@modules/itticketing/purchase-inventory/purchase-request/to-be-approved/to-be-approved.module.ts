import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToBeApprovedRoutingModule } from './to-be-approved-routing.module';
import { ToBeApprovedComponent } from './to-be-approved.component';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { ToBeAppDilogComponent } from './to-be-app-dilog/to-be-app-dilog.component';
import { ToBeAppActionComponent } from './to-be-app-action/to-be-app-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemarkDilogComponent } from './remark-dilog/remark-dilog.component';

@NgModule({
  declarations: [
    ToBeApprovedComponent,
    ToBeAppDilogComponent,
    ToBeAppActionComponent,
    RemarkDilogComponent
  ],
  imports: [
    CommonModule,
    ToBeApprovedRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ToBeApprovedModule { }
