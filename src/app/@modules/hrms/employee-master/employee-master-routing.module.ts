import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AchievementFormComponent } from './achievement-form/achievement-form.component';
import { AchievementCreateComponent } from './achievement-create/achievement-create.component';
import { AchievementListComponent } from './achievement-list/achievement-list.component';
import { EmployeeMasterComponent } from './employee-master.component';
import { LeaveApplyCreateComponent } from './leave-apply-create/leave-apply-create.component';
import { LeaveApplyListComponent } from './leave-apply-list/leave-apply-list.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { ResignationComponent } from './resignation/resignation.component';
import { ResignationCreateComponent } from './resignation-create/resignation-create.component';
import { CalendarComponent } from './calendar/calendar-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: EmployeeMasterComponent },
  { path: 'achievement', component: AchievementListComponent },
  { path: 'achievement-create', component: AchievementCreateComponent },
  { path: 'leave-apply', component: LeaveApplyListComponent },
  { path: 'leave-apply-form', component: LeaveApplyCreateComponent },
  // {path:'pay-slip',component:PaySlipComponent},
  // {path:'calendar',component:CalendarComponent},
  { path: 'resignation', component: ResignationComponent },
  { path: 'resignation-create', component: ResignationCreateComponent },

  {
    path: 'employ',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'on-boarding-employ',
    loadChildren: () =>
      import('./employee/on-boarding-emp-list/on-boarding-emp-list.module').then((m) => m.OnBoardingEmpListModule),
  },

  {
    path: 'employee-probation',
    loadChildren: () =>
      import('./employe-probation/employee-probation.module').then(
        (m) => m.ProbationModule
      ),
  },
  {
    path: 'grievance',
    loadChildren: () =>
      import('./grievance/grievance/grievance.module').then(
        (m) => m.GrievanceModule
      ),
  },
  {
    path: 'help-disk',
    loadChildren: () =>
      import('./help-desk/help-desk.module').then((m) => m.HelpDeskModule),
  },
  {
    path: 'announcement-list',
    loadChildren: () =>
      import('./internal-announcement/internal-announcement.module').then(
        (m) => m.InternalAnnouncementModule
      ),
  },


  // {
  //   path: 'advance_payment',
  //   loadChildren: () =>
  //     import('./advance-payment/advance-payment.module').then(
  //       (m) => m.AdvancePaymentModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeMasterRoutingModule {}
