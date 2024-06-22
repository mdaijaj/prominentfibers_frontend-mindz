import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollComponentComponent } from './payroll-component/payroll-component.component';
import { AddComponentTypeComponent } from './add-component-type.component';
import { AddTypeCreateComponent } from '../add-type-create/add-type-create.component';
import { AddCreateComponent } from '../add-create/add-create.component';
import { PfEsiComponent } from './pf-esi/pf-esi.component';
import { EsiComponent } from './esi/esi.component';
import { EsiCreateComponent } from './esi-create/esi-create.component';
import { PfCreateComponent } from './pf-create/pf-create.component';

const routes: Routes = [
  {path:'', component:PayrollComponentComponent,
  children: [
    {
      path: '', redirectTo: 'add-component-type', pathMatch: 'full'
    },
    {
      path: 'add-component-type', component: AddComponentTypeComponent

    },
    // {
    //   path: 'add-component', component: AddComponentComponent
    // },
    {
      path: 'pf-list', component: PfEsiComponent
    },
    {
      path: 'esi-list', component: EsiComponent
    },
    {
      path: 'esi-create', component: EsiCreateComponent
    },
    // {
    //   path: 'configuration', component: ConfigurationComponent
    // },
    {
      path: 'add-type-create', component: AddTypeCreateComponent
    },
    {
      path: 'add-create', component: AddCreateComponent
    },
    {
      path: 'pf-create', component: PfCreateComponent
    },
    // {
    //   path: 'configure-create', component: ConfigurationCreateComponent
    // },
  ]

},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddComponentTypeRoutingModule { }
