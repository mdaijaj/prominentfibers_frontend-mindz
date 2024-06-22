import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
// import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-s-and-m',
  templateUrl: './s-and-m.component.html',
  styleUrls: ['./s-and-m.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),
      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),
      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({ opacity: 0 })))
    ])
  ]
})


export class SAndMComponent {
  rowData: any;
  checks: boolean = false;
  showLoader: boolean = false;
  disabledSearchBox: boolean = true;
  searchVal: any = '';
  empId: any;
  show: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  authorityRole: any = JSON.parse(this.Login_user_id).role
  notificationData: any;
  isHidden: boolean = false;
  notification_id: any;
  showDelete_forever: boolean = false;
  aa: any = [];
  deleteNotification: any = [];
  length_noti: any = 0;
  constructor(
    public dialog: MatDialog,
    private route: Router,
    private toster: ToastrService,
    private _notification: NotificationServiceService
  ) {
  }
  ngOnInit(): void {
    let loginUser: any = localStorage.getItem('signInUser');
    let emp: any = JSON.parse(loginUser);
    this.empId = emp?.employee_id
    this.get_notification(this.empId)
  }

  get_notification(id: any) {
    this._notification.get_notification(id).subscribe((res: any) => {
      this.rowData = res.data
    let modifyData=(res.data).filter((modi:any)=>modi.type=="S&M");
    console.log(modifyData,"modi");
    this.rowData=modifyData
    })
    // console.log(this.rowData, "rowdata");

    // let filterData = this.rowData?.filter((res1: any) => res1.type == 'LMS')
    // this.rowData = filterData
    // console.log(filterData, "filterData");
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  openDialog(data: any, e: any) {
    e.stopPropagation();
    this.notification_id = data.lms_notification_id
    this.aa.push(this.notification_id)
    const datas = {
      lms_notification_id: this.aa
    }
    this._notification.delete_notification(datas).subscribe((res: any) => {
      this.reloadCurrentRoute();
      this.toster.success("Notification Delete Successfully");
    },
      (error) => {
        this.toster.error("Somthing wents wrong");

      })
  }
  select_multiple(data: any, e: any) {
    if (e.target.checked) {
      this.deleteNotification.push(data.lms_notification_id)
    } else {
      let filterData = this.deleteNotification.filter((res: any) => res !== data.lms_notification_id)
      this.deleteNotification = filterData
    }

    this.length_noti = this.deleteNotification.length
  }
  deleteAll() {
    const data = {
      lms_notification_id: this.deleteNotification
    }
    this._notification.delete_notification(data).subscribe((res: any) => {
      this.reloadCurrentRoute();
      this.toster.success("Delete Notification Successfully")
    },
      (err) => {
        this.toster.error("Somthing wents wrong")
      }
    )
  }

}

