import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualityManagementRoutingModule } from './quality-management-routing.module';
import { QualityManagementComponent } from './quality-management.component';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AssignUserModule } from '../crm/assign-user/assign-user.module';
import { QualityCheckComponent } from './quality-check/quality-check.component';
import { ActionComponent } from './quality-check/action/action.component';
import { UpdateQualityCheckComponent } from './quality-check/update-quality-check/update-quality-check.component';
import { QualityCheckChartComponent } from './quality-check/quality-check-chart/quality-check-chart.component';


@NgModule({
    declarations: [
        QualityManagementComponent,
        QualityCheckComponent,
        ActionComponent,
        UpdateQualityCheckComponent,
        QualityCheckChartComponent
    ],
    imports: [
        CommonModule,
        ShairedModule,
        QualityManagementRoutingModule,
        MaterialModule,
        AgGridModule,
        HttpClientModule,
        FormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatDialogModule,
        MatSidenavModule,
        MatExpansionModule,
        MatListModule,
        MatTooltipModule,
        ReactiveFormsModule,
        ShairedModule,
        CKEditorModule,
        AssignUserModule,
        AgGridModule,
    ]
})
export class QualityManagementModule { }
