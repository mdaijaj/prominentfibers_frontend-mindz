import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovedRejectUserRoutingModule } from './approved-reject-user-routing.module';
import { ApprovedRejectListComponent } from './approved-reject-list/approved-reject-list.component';
import { ApprovedRejectCreateComponent } from './approved-reject-create/approved-reject-create.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { DatepipePipe } from 'src/app/@shared/pipe/datepipe.pipe';

@NgModule({
  declarations: [
    ApprovedRejectListComponent,
    ApprovedRejectCreateComponent,
    // DatepipePipe
  ],
  imports: [
    CommonModule,
    ApprovedRejectUserRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
    
  ],
  //   exports: [
  //   FilterPipe,
  //   CountryFilterPipe,
  //   StateFilterValuePipe,
  //   CityFilterValuePipe
    

  // ]
})
export class ApprovedRejectUserModule { }
