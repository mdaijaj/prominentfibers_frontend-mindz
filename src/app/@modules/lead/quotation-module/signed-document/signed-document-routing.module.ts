import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignedDocumentListComponent } from './signed-document-list/signed-document-list.component';
import { SignedDocumentNewComponent } from './signed-document-create/signed-document.component';

const routes: Routes = [
    { path: '', component: SignedDocumentListComponent },
    { path: 'sign-doc', component: SignedDocumentNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignedDocumentRoutingModule { }
