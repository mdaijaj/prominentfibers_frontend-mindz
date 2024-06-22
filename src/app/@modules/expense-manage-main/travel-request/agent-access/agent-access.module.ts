import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentAccessRoutingModule } from './agent-access-routing.module';
import { AgentListComponent } from './agent-list/agent-list.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadModule } from 'src/app/@modules/lead/lead.module';

@NgModule({
  declarations: [
    AgentListComponent
  ],
  imports: [
    CommonModule,
    AgentAccessRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    LeadModule,
  ]
})
export class AgentAccessModule { }
