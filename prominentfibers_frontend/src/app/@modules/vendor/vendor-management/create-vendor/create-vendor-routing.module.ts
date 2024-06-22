import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVendorComponent } from './create-vendor.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';

const routes: Routes = [
  {
    path: '',
    component: CreateVendorComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-details',
        pathMatch: 'full',
      },
      {
        path: 'basic-details',
        component: BasicDetailsComponent,
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent,
      },
      {
        path: 'documents',
        component: DocumentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVendorRoutingModule {}
