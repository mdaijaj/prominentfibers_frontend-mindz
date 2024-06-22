import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigitallySignedDocumentListComponent } from './digitally-signed-document-list/digitally-signed-document-list.component';
import { DigitallySignedDocumentNewComponent } from './digitally-signed-document-create/digitally-signed-document.component';

const routes: Routes = [
    { path: '', component: DigitallySignedDocumentListComponent },
    { path: 'digital-sign-doc', component: DigitallySignedDocumentNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitallySignedDocumentRoutingModule { }
