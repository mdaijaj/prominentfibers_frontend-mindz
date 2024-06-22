import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMasterRoutingModule } from './employee-master-routing.module';
import { EmployeeMasterComponent } from './employee-master.component';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { AchievementListComponent } from './achievement-list/achievement-list.component';
import { LeaveApplyListComponent } from './leave-apply-list/leave-apply-list.component';
import { LeaveApplyCreateComponent } from './leave-apply-create/leave-apply-create.component';
import { AchievementCreateComponent } from './achievement-create/achievement-create.component';
import {MatNativeDateModule} from '@angular/material/core';
import { InternalAnnouncementModule } from './internal-announcement/internal-announcement.module';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionComponent } from './achievement-list/action/action.component';
import { AchievementDialogComponent } from './achievement-list/achievement-dialog/achievement-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ResignationComponent } from './resignation/resignation.component';
import { ResignationCreateComponent } from './resignation-create/resignation-create.component';
import { LeaveApplyActionComponent } from './leave-apply-action/leave-apply-action.component';
import { ComplaintModule } from './complaint/complaint.module';
import { CalendarComponent } from './calendar/calendar-list.component';
import { ProbationActionComponent } from './employe-probation/probation-action/probation-action.component';
import { ProbationDialogComponent } from './employe-probation/probation-dialog/probation-dialog.component';
import { LeaveDialogComponent } from './leave-apply-create/leave-dialog/leave-dialog.component';
import { ActionComponentResignation } from './resignation/action/action.component';
import { TimesheetModule } from './timesheet/timesheet.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HRManagementComponent } from './pending-task/hr-management/hr-management.component';
import { ProcurementBudgetApprovalComponent } from './pending-task/procurement-budget-approval/procurement-budget-approval.component';
import { LMSComponent } from './pending-task/lms/lms.component';
import { AdminComponent } from './pending-task/admin/admin.component';
import { ItTicketingComponent } from './pending-task/it-ticketing/it-ticketing.component';
@NgModule({
  declarations: [
    EmployeeMasterComponent,
    AchievementListComponent,
    LeaveApplyListComponent,
    LeaveApplyCreateComponent,
    AchievementCreateComponent,
    PaySlipComponent,
    ActionComponent,
    AchievementDialogComponent,
    ResignationComponent,
    ResignationCreateComponent,
    LeaveApplyActionComponent,
    CalendarComponent,
    ProbationActionComponent,
    ProbationDialogComponent,
    LeaveDialogComponent,
    ActionComponentResignation,
    DashboardComponent,

    // For pending task start
    HRManagementComponent,
    ProcurementBudgetApprovalComponent,
    LMSComponent,
    AdminComponent,
    ItTicketingComponent,
    // For pending task end
  ],
  imports: [
    CommonModule,
    EmployeeMasterRoutingModule,
    MaterialModule,
    AgGridModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    InternalAnnouncementModule,
    MatCardModule,
    ComplaintModule,
    TimesheetModule,
    FormsModule
  ]
})
export class EmployeeMasterModule { }
