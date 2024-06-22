import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RfpRoutingModule } from './rfp-routing.module';
import { RfpComponent } from './rfp.component';


@NgModule({
  declarations: [
    RfpComponent
  ],
  imports: [
    CommonModule,
    RfpRoutingModule
  ]
})
export class RfpModule { }
