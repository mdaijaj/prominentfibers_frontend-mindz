import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RbhVerificationComponent } from './rbh-verification.component';
import { RbhVerificationCheckComponent } from './rbh-verification-check/rbh-verification-check.component';

const routes: Routes = [
  {path:'', component:RbhVerificationComponent},
  {path:'rbh_check',component:RbhVerificationCheckComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RbhVarificationRoutingModule { }