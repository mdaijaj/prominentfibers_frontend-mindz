import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockedAuditorRoutingModule } from './blocked-auditor-routing.module';
import { BlockedAuditorCreateComponent } from './blocked-auditor-create/blocked-auditor-create.component';
import { BlockedAuditorListComponent } from './blocked-auditor-list/blocked-auditor.component';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
    declarations: [
        BlockedAuditorListComponent,
        BlockedAuditorCreateComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        BlockedAuditorRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule
    ],
    exports: [
    ]
  
})
export class BlockedAuditorModule { }
