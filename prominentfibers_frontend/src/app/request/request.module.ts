import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../@shared/material/material.module';
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestRoutingModule } from './request-routing.module';
import { HrmsModule } from '../@modules/hrms/hrms.module';
import { RequestFormResComponent } from './request-form-res/request-form-res.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';


@NgModule({
  declarations: [
    RequestFormComponent,
    RequestFormResComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RequestRoutingModule,
    FormsModule,
    HrmsModule,
    HttpClientModule,
    ToastrModule,
    MaterialModule,
    // LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    MatInputModule,
    MatSelectFilterModule,
    MatFormFieldModule,
  ],
  providers:[
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },

  ]
})
export class RequestModule { }
