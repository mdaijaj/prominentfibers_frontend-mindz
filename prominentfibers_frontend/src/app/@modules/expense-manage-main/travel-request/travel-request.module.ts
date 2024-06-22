import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { ShairedModule } from 'src/app/@shared/shaired/shaired.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CKEditorModule } from 'ckeditor4-angular';
import { TravelRequestRoutingModule } from './travel-request-routing.module';
import { TravelRequestMainComponent } from './travel-request.component';
// import { MangerExpenseComponent } from './manger-expense/manger-expense.component';

@NgModule({
  declarations: [
    TravelRequestMainComponent,
    // MangerExpenseComponent
  ],
  imports: [
    CommonModule,
    TravelRequestRoutingModule,
    MaterialModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    MatDialogModule,
    MatDialogModule,
    ShairedModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    CKEditorModule 
  ]
})
export class TravelRequestMainModule { }
