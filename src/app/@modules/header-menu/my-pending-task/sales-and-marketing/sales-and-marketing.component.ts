import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
// import { ContentDialogComponent } from 'src/app/@modules/lms/lms-management/dashboard-lms/super-admin/content-learning/content-dialog/content-dialog.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { filter } from 'jszip';
import { SystemSendNotificationComponent } from 'src/app/@modules/lead/existing-customer/advance-planning/system-send-notification/system-send-notification.component';
import { NotificationPendingTaskService } from 'src/app/@shared/services/notification-pending-task.service';

@Component({
  selector: 'app-sales-and-marketing',
  templateUrl: './sales-and-marketing.component.html',
  styleUrls: ['./sales-and-marketing.component.scss']
})
export class SalesAndMarketingComponent implements OnInit {
  rowData: any;
  showLoader: boolean = false;
  disabledSearchBox: boolean = true;
  searchVal: any = '';
  list: any;
  notifications: any;
  notificationType: string="New Notification";
  notificationToolTipe: string="Click Old Notification";
  constructor(private _lmsService: LmsServiceService,
    public dialog: MatDialog,
    private route: Router,
    private leadService: LeadService,
    private notification: NotificationPendingTaskService
  ) {
  }

  ngOnInit(): void {
    localStorage.setItem("employee_id:", "undefined");
    this.showLoader = true;
    this.leadService.RA_TRA_LIST().subscribe((res: any) => {
      this.list = res.result;
      

      let fitlerMn = this.list.filter((a: any) => Number(a.remaining_count) === Number(520))
      
      // this.rowData = fitlerMn
      
    }
      , (err) => {
        
        this.showLoader = false;
      }
    );


    // this.rowData = this.notification.dummayForCheck


  }


  getCellValue(rowData: any) {
    // 
    // const dialogRef = this.dialog.open(ContentDialogComponent, {
    //   width: '400px',
    //   data: rowData
    // });
    // dialogRef.afterClosed().subscribe((result) => {
      
    // });
  }

  showSearchBox(searchBox: any) {
    searchBox.classList.toggle('showSearchBox')
    // 

    this.disabledSearchBox = !this.disabledSearchBox
    if (this.disabledSearchBox) {
      this.searchVal = '';
    };
  }
  openDialog(data: any, e: any) {
    e.stopPropagation()
    
    

  }
  notify_company_details() {
    this.dialog.open(SystemSendNotificationComponent);
  }
  notificationd() {
    this.notification.notifications = true
    this.notifications = !this.notifications
    

    if (this.notifications == true) {
      this.notificationType = "Old Notification"
      this.notificationToolTipe = "Click New Notification"

    // this.rowData = this.notification.dummayForCheck2

    }
    else {
      this.notificationType = "New Notification"
      this.notificationToolTipe = "Click Old Notification"

      // this.rowData = this.notification.dummayForCheck

    }
  }
  goToTask(data:any,e:any){
    this.route.navigate(['master/audit/pre-audit/RA-TRA200'])
  }

}

