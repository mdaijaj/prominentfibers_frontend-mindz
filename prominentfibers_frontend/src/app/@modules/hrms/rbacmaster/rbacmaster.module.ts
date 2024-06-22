import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RbacmasterRoutingModule } from './rbacmaster-routing.module';
import { RbacmasterComponent } from './rbacmaster.component';
import { RbacRoleMasterModule } from './rbac-role-master/rbac-role-master.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/@shared/material/material.module';


@NgModule({
  declarations: [
    RbacmasterComponent
  ],
  imports: [
    CommonModule,
    RbacmasterRoutingModule,
    RbacRoleMasterModule,
    AgGridModule,
    FormsModule,
    MaterialModule
  ]
})
export class RbacmasterModule { }
