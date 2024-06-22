import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyExpenseListComponent } from './my-expenses-list/my-expenses-list.component';
import { MyExpenseComponent } from './my-expenses/my-expenses.component';
import { TaskOrderListComponent } from './task-order-list/task-order-list.component';
// import { ProcessingComponent } from './processing/processing.component';
// import { PostedComponent } from './posted/posted.component';
// import { ProcessingListComponent } from './processing-list/processing-list.component';
// import { PostedListComponent } from './posted-list/posted-list.component';
import { UpdateMyExpenseComponent } from './update-my-expense/update-my-expense.component';
import { DraftMyExpenseComponent } from './draft-my-expense/draft-my-expense.component';

const routes: Routes = [
    { path: '', component: MyExpenseListComponent },
    { path: 'task-order-list', component: TaskOrderListComponent },
    { path: 'create-expense', component: MyExpenseComponent },
    // {path:'processing',component:ProcessingComponent},
    // {path:'posted',component:PostedComponent},
    // {path:'processing-list',component:ProcessingListComponent},
    // {path:'posted-list',component:PostedListComponent},
    {path:'update-my-expense',component:UpdateMyExpenseComponent},
    {path:'draft-my-expense',component:DraftMyExpenseComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyExpenseRoutingModule { }
