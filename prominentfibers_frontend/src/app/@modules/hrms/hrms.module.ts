import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';
import { HrmsComponent } from './hrms.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AppModule } from "../../app.module";
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthModule } from 'src/app/@auth/auth.module';
import { DMSModule } from './dms/dms.module';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from 'src/app/@shared/header/header.component';
import { FooterComponent } from 'src/app/@shared/footer/footer.component';

@NgModule({
    declarations: [
        HrmsComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        HrmsRoutingModule,
        MaterialModule,
        AgGridModule,
        CKEditorModule,
        DMSModule,
        ShairedModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent
    ]
  
})
export class HrmsModule { }
