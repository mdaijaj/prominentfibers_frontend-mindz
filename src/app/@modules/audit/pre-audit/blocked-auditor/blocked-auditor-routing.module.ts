import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedAuditorCreateComponent } from './blocked-auditor-create/blocked-auditor-create.component';
import { BlockedAuditorListComponent } from './blocked-auditor-list/blocked-auditor.component';

const routes: Routes = [
    { path: '', component: BlockedAuditorListComponent },
    { path: 'blocked-auditor-save', component: BlockedAuditorCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockedAuditorRoutingModule { }
