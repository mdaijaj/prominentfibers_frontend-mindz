import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { EmailSendeComponent } from '../components/email-sende/email-sende.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    SidebarMenuComponent,
    EmailSendeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  exports:[
    SidebarMenuComponent,
    EmailSendeComponent
  ]
})
export class ShairedModule { }