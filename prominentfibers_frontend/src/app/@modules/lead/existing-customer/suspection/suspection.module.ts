import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuspectionRoutingModule } from './suspection-routing.module';
import { SuspectionComponent } from './suspection.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { ActionComponent } from './action/action.component';
import { CertificateUpdateComponent } from './certificate-update/certificate-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { SuspentionListConditionBasisComponent } from './suspention-list-condition-basis/suspention-list-condition-basis.component';
import { NotificationSComponent } from './notification-s/notification-s.component';


@NgModule({
  declarations: [
    SuspectionComponent,
    ActionComponent,
    CertificateUpdateComponent,
    SuspentionListConditionBasisComponent,
    NotificationSComponent,
  ],
  imports: [
    CommonModule,
    SuspectionRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ]
})
export class SuspectionModule { }
