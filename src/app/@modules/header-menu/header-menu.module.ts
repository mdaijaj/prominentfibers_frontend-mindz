import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/@shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { HrmsModule } from '../hrms/hrms.module';
import { HeaderMenuRoutingModule } from './header-menu-routing.module';
import { MyPendingTaskComponent } from './my-pending-task/my-pending-task.component';
import { HeaderMenuComponent } from './header-menu.component';
import { MyPendingActionComponent } from './my-pending-task/my-pending-action/my-pending-action.component';
import { HRManagementComponent } from './my-pending-task/hr-management/hr-management.component';
import { SalesAndMarketingComponent } from './my-pending-task/sales-and-marketing/sales-and-marketing.component';
import { LMSComponent } from './my-pending-task/lms/lms.component';
import { AdminComponent } from './my-pending-task/admin/admin.component';
import { ViewComponent } from './my-pending-task/hr-management/view/view.component';
import { HRPipe } from 'src/app/@shared/pipe/my_pending_task_pipe/hr.pipe';
import { ItTicketingComponent } from './my-pending-task/it-ticketing/it-ticketing.component';
import { MydialogComponent } from './my-pending-task/it-ticketing/mydialog/mydialog.component';
import { ItTicketingPipe } from 'src/app/@shared/pipe/my_pending_task_pipe/it-ticketing.pipe';
import { LmsApprovalDialogComponent } from './my-pending-task/lms-approval-dialog/lms-approval-dialog.component';
import { ProcurementBudgetApprovalComponent } from './my-pending-task/procurement-budget-approval/procurement-budget-approval.component';

@NgModule({
  declarations: [
    MyPendingTaskComponent,
    HeaderMenuComponent,
    MyPendingActionComponent,
    HRManagementComponent,
    SalesAndMarketingComponent,
    LMSComponent,
    AdminComponent,
    ViewComponent,
    HRPipe,
    ItTicketingComponent,
    MydialogComponent,
    ItTicketingPipe,
    LmsApprovalDialogComponent,
    ProcurementBudgetApprovalComponent,
  ],
  imports: [
    CommonModule,
    HeaderMenuRoutingModule,
    MaterialModule,
    HrmsModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule
  ]
})
export class HeaderMenuModule { }
