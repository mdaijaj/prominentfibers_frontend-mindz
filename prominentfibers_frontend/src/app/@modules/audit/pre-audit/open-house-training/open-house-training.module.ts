import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenHouseRoutingModule } from './open-house-training-routing.module';
import { LeadModule } from 'src/app/@modules/lead/lead.module';
import { OpenHouseComponent } from './open-house-training-create/open-house-training.component';
import { OpenHouseListComponent } from './open-house-training-list/open-house-training-list.component';
import { RevenueListComponent } from './revenue-list/revenue-list.component';
import { RevenueCreateComponent } from './revenue-create/revenue-create.component';
import { AsssumptionCreateComponent } from './asssumption-create/asssumption-create.component';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
    declarations: [
        OpenHouseComponent,
        OpenHouseListComponent,
        RevenueListComponent,
        RevenueCreateComponent,
        AsssumptionCreateComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        OpenHouseRoutingModule,
        AgGridModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        LeadModule,
        MatSelectFilterModule
    ],
    exports: [
    ]
  
})
export class OpenHouseModuleModule { }
