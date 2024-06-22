import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendLinkVendorComponent } from './send-link-vendor.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  { path: "", component:SendLinkVendorComponent,
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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendLinkVendorRoutingModule { }
