import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoIssuedComponent } from './po-issued/po-issued.component';
import { PoIssuedActionComponent } from './po-issued-action/po-issued-action.component';
import { POIssuedRoutingModule } from './po-issued-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from 'src/app/@shared/material/material.module';



@NgModule({
  declarations: [
    PoIssuedComponent,
    PoIssuedActionComponent
  ],
  imports: [
    CommonModule,
    POIssuedRoutingModule,
    AgGridModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PoIssuedModule { }
