import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAuditComponent } from './post-audit.component';
import { UploadedCertificatesComponent } from './uploaded-certificates/uploaded-certificates.component';
import { VerifiedDQSDataComponent } from './verified-dqs-data/verified-dqs-data.component';

const routes: Routes = [
  { path: '', component: PostAuditComponent },
  {
    path: 'under-l1-review',
    loadChildren: () =>
      import('./under-l1-review/under-l1-review.module').then(
        (m) => m.UnderL1ReviewModule
      ),
  },
  {
    path: 'l1-review',
    loadChildren: () =>
      import('./l1-review/l1-review.module').then((m) => m.L1ReviewModule),
  },
  {
    path: 'payment_varification',
    loadChildren: () =>
      import('./payment-verification/payment-verification.module').then(
        (m) => m.PaymentVerificationModule
      ),
  },
  {
    path: 'rbh_verification',
    loadChildren: () =>
      import('./rbh-verification/rbh-verification.module').then(
        (m) => m.RbhVerificationModule
      ),
  },
  {
    path: 'techreview',
    loadChildren: () =>
      import('./technical-review/technical-review.module').then(
        (m) => m.TechnicalReviewModule
      ),
  },
  {
    path: 'manage-dates',
    loadChildren: () =>
      import('./manage-dates/dates.module').then((m) => m.LeadDatesModule),
  },
  {
    path: 'upload-docs',
    loadChildren: () =>
      import('./upload-docs/upload.module').then((m) => m.LeadUploadtModule),
  },
  {
    path: 'completeness-check',
    loadChildren: () =>
      import('./completeness-check/completeness-check.module').then((m) => m.CompletenessCheckModule),
  },
  {
    path: 'upload-docs-list',
    loadChildren: () =>
      import('./upload-certifi-list/upload-certifi-list.module').then(
        (m) => m.UploadCertifiListModule
      ),
  },
  // {
  //   path: 'auditor-score-card',
  //   loadChildren: () =>
  //     import('./auditor-score-card/auditor-score-card.module').then(
  //       (m) => m.AuditorScoreCardModule
  //     ),
  // },
  { path: 'uploaded-certificates', component: UploadedCertificatesComponent },
  { path: 'verified-dqs-data', component: VerifiedDQSDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAuditRoutingModule {}
