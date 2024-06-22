import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoIssuedComponent } from './po-issued/po-issued.component';

const routes: Routes = [
  { path: "", component: PoIssuedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class POIssuedRoutingModule { }