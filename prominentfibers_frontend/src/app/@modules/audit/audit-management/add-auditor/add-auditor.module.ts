import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAuditorRoutingModule } from './add-auditor-routing.module';
import { AddAuditorListComponent } from './add-auditor-list/add-auditor-list.component';
import { AddAuditorCreateComponent } from './add-auditor-create/add-auditor-create.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { ActionAuditComponent } from './action-audit/action-audit.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { AuditorMapingListComponent } from './auditor-maping-list/auditor-maping-list.component';


@NgModule({
  declarations: [
    AddAuditorListComponent,
    AddAuditorCreateComponent,
    ActionAuditComponent,
    AuditorMapingListComponent
  ],
  imports: [
    CommonModule,
    AddAuditorRoutingModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ShairedModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class AddAuditorModule { }
