import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingMaterialListComponent } from './training-material-list/training-material-list.component';
import { TrainingFeedbackCreateComponent } from './training-feedback-create/training-feedback-create.component';

const routes: Routes = [
  { path: '', component: TrainingMaterialListComponent },
    { path: 'training-feedback-create', component: TrainingFeedbackCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingMaterialRoutingModule { }
