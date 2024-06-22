import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollComponentRoutingModule } from './payroll-component-routing.module';
import { PayrollComponentComponent } from './payroll-component.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AddTypeActionComponent } from './add-type-action/add-type-action.component';
import { AddTypeDilogComponent } from './add-type-dilog/add-type-dilog.component';
import { AddCreateComponent } from './add-create/add-create.component';
import { PfDilogComponent } from './pf-esi/pf-dilog/pf-dilog.component';
import { PfActionComponent } from './pf-esi/pf-action/pf-action.component';
import { PfCreateComponent } from './pf-esi/pf-create/pf-create.component';
import { PfEsiComponent } from './pf-esi/pf.component';
import { EsiActionComponent } from './esi/esi-action/esi-action.component';
import { EsiComponent } from './esi/esi.component';
import { EsiCreateComponent } from './esi/esi-create/esi-create.component';
import { EsiDilogComponent } from './esi/esi-dilog/esi-dilog.component';


@NgModule({
  declarations: [
    PayrollComponentComponent,
    AddComponentComponent,
    AddTypeActionComponent,
    AddTypeDilogComponent,
    AddCreateComponent,
    PfEsiComponent,
    PfDilogComponent,
    PfActionComponent,
    PfCreateComponent,
    EsiActionComponent,
    EsiComponent,
    EsiCreateComponent,
    EsiDilogComponent
  ],
  imports: [
    CommonModule,
    PayrollComponentRoutingModule,
    AgGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule  

  ]
})
export class PayrollComponentModule { }
