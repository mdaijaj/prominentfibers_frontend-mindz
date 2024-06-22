import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedSignedDocumentNewComponent } from './verify-signed-document-create/verify-signed-document.component';
import { VerifiedSignedDocumentListComponent } from './verify-signed-document-list/verify-signed-document-list.component';

const routes: Routes = [
    { path: '', component: VerifiedSignedDocumentListComponent },
    { path: 'verify-sign-doc', component: VerifiedSignedDocumentNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifiedSignedDocumentRoutingModule { }
