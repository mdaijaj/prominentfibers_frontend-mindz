import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountMasterComponent } from './account-master.component';

const routes: Routes = [{ path: '', component: AccountMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountMasterRoutingModule { }
