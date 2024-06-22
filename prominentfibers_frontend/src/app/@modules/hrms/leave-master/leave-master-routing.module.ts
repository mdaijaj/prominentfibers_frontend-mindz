import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicableComponent } from './applicable/applicable.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';
import { ApprovedLeaveComponent } from './approved-leave/approved-leave.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { EntitlementComponent } from './entitlement/entitlement.component';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LeaveAdjustmentComponent } from './leave-adjustment/leave-adjustment.component';
import { LeaveApplyCreateComponent } from './leave-apply-create/leave-apply-create.component';
import { LeaveApplyListComponent } from './leave-apply-list/leave-apply-list.component';
import { LeaveMasterCreateComponent } from './leave-master-create/leave-master-create.component';
import { LeaveMasterListComponent } from './leave-master-list/leave-master-list.component';
import { LeaveMasterComponent } from './leave-master.component';
import { LeavePolicyCreateComponent } from './leave-policy-create/leave-policy-create.component';
import { LeavePolicyComponent } from './leave-policy/leave-policy.component';
import { RejectedLeaveComponent } from './rejected-leave/rejected-leave.component';
import { RestrictionsComponent } from './restrictions/restrictions.component';
import { UnapprovedLeaveComponent } from './unapproved-leave/unapproved-leave.component';

const routes: Routes = [
  {path:'', component:LeaveMasterComponent},
  {path:'leave-master-list', component:LeaveMasterListComponent},
  {path:'leave-master-create', component:LeaveMasterCreateComponent},
  {path:'leave-policy', component:LeavePolicyComponent},
  {path:'holiday-list', component:HolidayComponent},
  {path:'holiday-create', component:HolidayCreateComponent},
  {path:'leave-apply-list', component:LeaveApplyListComponent},
  {path:'leave-apply-create', component:LeaveApplyCreateComponent},
  {path:'approve-leave', component:ApproveLeaveComponent,
  children: [
    {
      path: '', redirectTo: 'unapproved-leave', pathMatch: 'full'
    },
    {
      path: 'unapproved-leave', component: UnapprovedLeaveComponent

    },
    {
      path: 'approved-leave', component: ApprovedLeaveComponent
    },
    {
      path: 'rejected-leave', component: RejectedLeaveComponent
    },
  ]

},
  {path:'attendance-calendar', component:AttendanceCalendarComponent},
  {path:'daily-attendance', component:DailyAttendanceComponent},
  {path:'leave-adjustment', component:LeaveAdjustmentComponent},

  {path:'leave-policy-create', component:LeavePolicyCreateComponent,

  children: [
    {
      path: '', redirectTo: 'entitlement', pathMatch: 'full'
    },
    {
      path: 'entitlement', component: EntitlementComponent

    },
    {
      path: 'applicable', component: ApplicableComponent
    },
    {
      path: 'restrictions', component: RestrictionsComponent
    },
  ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveMasterRoutingModule { }
