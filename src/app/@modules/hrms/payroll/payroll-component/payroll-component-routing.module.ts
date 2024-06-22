import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponentComponent } from './payroll-component.component';
import { AddComponentComponent } from './add-component/add-component.component';
import { AddCreateComponent } from './add-create/add-create.component';
import { PfCreateComponent } from './pf-esi/pf-create/pf-create.component';
import { PfDilogComponent } from './pf-esi/pf-dilog/pf-dilog.component';
import { PfActionComponent } from './pf-esi/pf-action/pf-action.component';
import { PfEsiComponent } from './pf-esi/pf.component';
import { EsiComponent } from './esi/esi.component';
import { EsiActionComponent } from './esi/esi-action/esi-action.component';
import { EsiCreateComponent } from './esi/esi-create/esi-create.component';
import { EsiDilogComponent } from './esi/esi-dilog/esi-dilog.component';

const routes: Routes = [
  {path:'',component:PayrollComponentComponent,children:[
    {path:'', redirectTo:"add-component-type", pathMatch:'full'},
    {path:'add-component-type',component:AddComponentComponent},
    // {path:'add-component',component:AddComponentComponent},
    {path:'add-create',component:AddCreateComponent},
    {path:'pf-create',component:PfCreateComponent},
    {path:'pf-dialog',component:PfDilogComponent},
    {path:'pf-action',component:PfActionComponent},
    {path:'pf',component:PfEsiComponent},
    {path:'esi',component:EsiComponent},
    {path:'esi_action',component:EsiActionComponent},
    {path:'esi_create',component:EsiCreateComponent},
    {path:'esi_dialog',component:EsiDilogComponent},

    ]},
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollComponentRoutingModule {
    
 }
