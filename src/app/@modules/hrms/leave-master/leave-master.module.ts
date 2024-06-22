import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveMasterRoutingModule } from './leave-master-routing.module';
import { HolidayComponent } from './holiday/holiday.component';
import { LeavePolicyComponent } from './leave-policy/leave-policy.component';
import { AgGridModule } from 'ag-grid-angular';
import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { ActionComponent } from './holiday/action/action.component';
import { ActionComponentLeavePolicy } from './leave-policy/action/action.component';
import { LeavePolicyCreateComponent } from './leave-policy-create/leave-policy-create.component';
import { EntitlementComponent } from './entitlement/entitlement.component';
import { ApplicableComponent } from './applicable/applicable.component';
import { RestrictionsComponent } from './restrictions/restrictions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveMasterListComponent } from './leave-master-list/leave-master-list.component';
import { LeaveMasterCreateComponent } from './leave-master-create/leave-master-create.component';
import { LeaveApplyListComponent } from './leave-apply-list/leave-apply-list.component';
import { LeaveApplyCreateComponent } from './leave-apply-create/leave-apply-create.component';
import { ApproveLeaveComponent } from './approve-leave/approve-leave.component';
import { AttendanceCalendarComponent } from './attendance-calendar/attendance-calendar.component';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { LeaveAdjustmentComponent } from './leave-adjustment/leave-adjustment.component';
import { UnapprovedLeaveComponent } from './unapproved-leave/unapproved-leave.component';
import { ApprovedLeaveComponent } from './approved-leave/approved-leave.component';
import { RejectedLeaveComponent } from './rejected-leave/rejected-leave.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LeaveAdjutmentActionComponent } from './leave-adjustment/action/action.component';
import { LeaveMasterActionComponent } from './leave-master-list/leave-master-action/leave-master-action.component';
import { HolidayDilogComponent } from './holiday/holiday-dilog/holiday-dilog.component';
import { LeaveDilogComponent } from './leave-master-list/leave-dilog/leave-dilog.component';
import { EmpFilterPipe } from 'src/app/@shared/pipe/emp-filter.pipe';
import { RoleFilterPipe } from 'src/app/@shared/pipe/filterPipes/role-filter.pipe';
import { DepFilterPipe } from 'src/app/@shared/pipe/filterPipes/dep-filter.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AttendPopupComponent } from './attendance-calendar/attend-popup/attend-popup.component';
import { RouterModule } from '@angular/router';
import { LeaveMasterComponent } from './leave-master.component';
import { ActionInLeaveApplyComponent } from './leave-apply-list/action/action.component';
import { ActionForUnaprovedLeaveComponent } from './unapproved-leave/action/action.component';
import { LeaveDetailsPopupComponent } from './unapproved-leave/leave-details-popup/leave-details-popup.component';
import { ApplyLeavePopupComponent } from './leave-apply-list/apply-leave-popup/apply-leave-popup.component';
import { EmployeefilterPipe } from 'src/app/@shared/pipe/filterPipes/employeefilter.pipe';
import { ImportHolidayPopupComponent } from './holiday/import-holiday-popup/import-holiday-popup.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AllowActionModule } from 'src/app/@shared/shaired/allow-action.module';
@NgModule({
  declarations: [
    HolidayComponent,
    LeaveMasterComponent,
    LeavePolicyComponent,
    HolidayCreateComponent,
    ActionComponent,
    ActionComponentLeavePolicy,
    LeavePolicyCreateComponent,
    EntitlementComponent,
    ApplicableComponent,
    RestrictionsComponent,
    LeaveMasterListComponent,
    LeaveMasterCreateComponent,
    LeaveApplyListComponent,
    LeaveApplyCreateComponent,
    ApproveLeaveComponent,
    AttendanceCalendarComponent,
    DailyAttendanceComponent,
    LeaveAdjustmentComponent,
    UnapprovedLeaveComponent,
    ApprovedLeaveComponent,
    RejectedLeaveComponent,
    LeaveAdjutmentActionComponent,
    LeaveMasterActionComponent,
    HolidayDilogComponent,
    LeaveDilogComponent,
    EmpFilterPipe,
    RoleFilterPipe,
    DepFilterPipe,
    AttendPopupComponent,
    ActionInLeaveApplyComponent,
    ActionForUnaprovedLeaveComponent,
    LeaveDetailsPopupComponent,
    ApplyLeavePopupComponent,
    EmployeefilterPipe,
    ImportHolidayPopupComponent
  ],
  imports: [
    CommonModule,
    LeaveMasterRoutingModule,
    RouterModule,
    AgGridModule,
    MaterialModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    AllowActionModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class LeaveMasterModule { }
