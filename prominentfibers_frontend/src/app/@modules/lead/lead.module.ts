import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { LeadGenerationComponent } from './lead-management/lead-management.component';
import { LeadRoutingModule } from './lead-routing.module';
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
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { LeadComponent } from './lead.component';
import { HrmsModule } from '../hrms/hrms.module';
import { ActionComponent } from './action/action.component';
import { FilterPipe } from 'src/app/@shared/pipe/filter.pipe';
import { CountryFilterPipe } from 'src/app/@shared/pipe/country-filter.pipe';
import { StateFilterValuePipe } from 'src/app/@shared/pipe/state-filter-value.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { CityFilterValuePipe } from 'src/app/@shared/pipe/city-filter-value.pipe';


@NgModule({
  declarations: [
    LeadComponent,
    ActionComponent,
    FilterPipe,
    CountryFilterPipe,
    StateFilterValuePipe,
    CityFilterValuePipe
  ],
  imports: [
    CommonModule,
    LeadRoutingModule,
    MaterialModule,
    HrmsModule,
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
     MatSelectModule, 
        MatSelectFilterModule 
  ],
  exports: [
    FilterPipe,
    CountryFilterPipe,
    StateFilterValuePipe,
    CityFilterValuePipe
    

  ]
})
export class LeadModule { }
