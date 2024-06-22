import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditorScoreCardRoutingModule } from './auditor-score-card-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    AuditorScoreCardRoutingModule
  ]
})
export class AuditorScoreCardModule { }
