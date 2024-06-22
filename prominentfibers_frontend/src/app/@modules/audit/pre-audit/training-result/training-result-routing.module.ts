import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingResultComponent } from './training-result.component';

const routes: Routes = [{ path: '', component: TrainingResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingResultRoutingModule { }
