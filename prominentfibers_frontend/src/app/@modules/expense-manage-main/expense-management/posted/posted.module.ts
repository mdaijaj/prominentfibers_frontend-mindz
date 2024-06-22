import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostedRoutingModule } from './posted-routing.module';
import { PostedComponent } from './posted/posted.component';
import { PostedListComponent } from './posted-list/posted-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
  declarations: [
    PostedComponent,
    PostedListComponent
  ],
  imports: [
    CommonModule,
    PostedRoutingModule,
    MaterialModule,
    AgGridModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule
  ]
})
export class PostedModule { }
