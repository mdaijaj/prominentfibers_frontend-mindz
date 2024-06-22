import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspectionComponent } from './suspection.component';
import { CertificateUpdateComponent } from './certificate-update/certificate-update.component';
import { SuspentionListConditionBasisComponent } from './suspention-list-condition-basis/suspention-list-condition-basis.component';

const routes: Routes = [{ path: '', component: SuspectionComponent },
{path:'suspention',component:SuspectionComponent},
{path:'update-certificate',component:CertificateUpdateComponent},
{path:'suspention-list-notification',component:SuspentionListConditionBasisComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuspectionRoutingModule { }
