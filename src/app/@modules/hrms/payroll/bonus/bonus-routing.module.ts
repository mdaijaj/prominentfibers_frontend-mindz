import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusConfigureCreateComponent } from './bonus-configure-create/bonus-configure-create.component';
import { BonusConfigureComponent } from './bonus-configure/bonus-configure.component';
import { BonusComponent } from './bonus.component';
import { EmployeeBonusCreateComponent } from './employee-bonus-create/employee-bonus-create.component';
import { EmployeeBonusComponent } from './employee-bonus/employee-bonus.component';

const routes: Routes = [
  // {path:'', component:BonusComponent},
  {path:'', component:EmployeeBonusComponent},
  {path:'employee-bonus-create', component:EmployeeBonusCreateComponent},
  {path:'bonus-configure', component:BonusConfigureComponent},
  {path:'bonus-configure-create', component:BonusConfigureCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusRoutingModule { }
