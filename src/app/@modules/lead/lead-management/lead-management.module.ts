import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { LeadGenerationComponent } from './lead-management.component';
import { CreateLeadComponent } from './create-lead/create-lead.component';
import { LeadManagementRoutingModule } from './lead-management-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadHomeComponent } from './lead-home/lead-home.component';
import { FilterPipe } from 'src/app/@shared/pipe/filter.pipe';
import { AppModule } from 'src/app/app.module';
import { LeadModule } from '../lead.module';
import { LeadMasterComponent } from './lead-master/lead-master.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryFilterPipe } from 'src/app/@shared/pipe/country-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        LeadGenerationComponent,
        CreateLeadComponent,
        LeadHomeComponent,
        LeadMasterComponent,
    ],
    imports: [
        CommonModule,
        LeadManagementRoutingModule,
        MaterialModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        HttpClientModule,
        MatSelectModule, 
        MatSelectFilterModule,
        
    ],
    exports: [
    ]
  
})
export class LeadManagementModule { }
