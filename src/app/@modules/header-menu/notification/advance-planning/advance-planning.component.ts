import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
// import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
// import { ContentDialogComponent } from 'src/app/@modules/lms/lms-management/dashboard-lms/super-admin/content-learning/content-dialog/content-dialog.component';
import { LmsUserManagementService } from 'src/app/@shared/services/lms-user-management.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MyPendingTaskService } from 'src/app/@shared/services/my-pending-task.service';

@Component({
  selector: 'app-advance-planning',
  templateUrl: './advance-planning.component.html',
  styleUrls: ['./advance-planning.component.scss']
})
export class AdvancePlanningComponent {
  rowData: any;
  showLoader: boolean = false;
  disabledSearchBox: boolean = true;
  searchVal: any = '';
  empId: any;
  show: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  authorityRole: any = JSON.parse(this.Login_user_id).role


  constructor(private _lmsService: LmsServiceService,
    private myPendingTask: MyPendingTaskService,
    public dialog: MatDialog,
    private _lmsUserManagementService: LmsUserManagementService,
    private route: Router,

    private toster: ToastrService,

  ) {
  }

  ngOnInit(): void {
    let loginUser: any = localStorage.getItem('signInUser');
    let emp: any = JSON.parse(loginUser);
    this.empId = emp?.employee_id
    this.getPenddingData(emp?.employee_id);
    this.getById(this.empId);
  }
  getById(id: any) {

    this.myPendingTask.getnotificationlist(id).subscribe((responsive: any) => {
      console.log(responsive, "responsive");
      let modifyData: any = []
      for (let a = 0; a < responsive.data.length; a++) {
        console.log(Object.keys(responsive.data[a])[0], "Object.keys(responsive.data[a])");
        //notification
        
        if (Object.keys(responsive.data[a])[0] == 'notification') {
          for (let n = 0; n <= responsive.data[a].notification.length - 1; n++) {
            let Authority
            let aa=responsive.data[a].notification[n]
            let obj:any = {
              associated_company: aa?.associated_company,
              br_number: aa?.br_number,
              lead_genration_id: aa?.lead_genration_id,
              remaining_count: aa?.remaining_count,
              stage: aa?.stage,
              to: 'notification',
              Authority: 'Cp_verifier'
            }
            modifyData.push(obj)
          }
        }
        //suspension
        if (Object.keys(responsive.data[a])[0] == 'suspenseList') {
          for (let n = 0; n <= responsive.data[a].suspenseList.length - 1; n++) {
            let aa=responsive.data[a].suspenseList[n]
            let Authority
            let obj:any = {
              associated_company: aa?.associated_company,
              br_number: aa?.br_number,
              lead_genration_id: aa?.lead_genration_id,
              remaining_count: aa?.remaining_count,
              stage: aa?.stage,
              to: 'suspension'
            }
            if (aa?.suspension_list == "Suspense" && aa?.stage == 'RA' && aa?.remaining_count==0) {
              obj.Authority = 'Post_Audit'
            }
            modifyData.push(obj)
          }
        }
        //widthdrawlList
        if (Object.keys(responsive.data[a])[0] == 'widthdrawlList') {
          for (let n = 0; n <= responsive.data[a].widthdrawlList.length - 1; n++) {
            let Authority
            let aa=responsive.data[a].widthdrawlList[n]
            let obj:any = {
              associated_company: aa?.associated_company,
              br_number: aa?.br_number,
              lead_genration_id: aa?.lead_genration_id,
              remaining_count: aa?.remaining_count,
              stage: aa?.stage,
              to: 'widthdrawal'
            }
            if (aa?.outdays_count>=89 && aa?.status!==" Waiting for RBH Approval") {
              obj.Authority = 'Post_Audit'
            }
            if (aa?.outdays_count>=89 && aa?.status==" Waiting for RBH Approval") {
              obj.Authority = 'RBH'
            }
            modifyData.push(obj)
          }
        }
        //leadverifiedList
        if (Object.keys(responsive.data[a])[0] == 'leadverifiedList') {
          for (let n = 0; n <= responsive.data[a].leadverifiedList.length - 1; n++) {
            let Authority
            let obj: any = {
              associated_company: responsive.data[a].leadverifiedList[n]?.associated_company,
              br_number: responsive.data[a].leadverifiedList[n]?.br_number,
              lead_genration_id: responsive.data[a].leadverifiedList[n]?.lead_genration_id,
              remaining_count: responsive.data[a].leadverifiedList[n]?.remaining_count,
              stage: responsive.data[a].leadverifiedList[n]?.stage,
              to: 'leadVerified'
            }
            // let datas=responsive.data[a].leadverifiedList[n].remaining_count
            if (responsive.data[a].leadverifiedList[n].remaining_count == 0) {
              obj.Authority = 'Planning_Team'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 200 && responsive.data[a].leadverifiedList[n].remaining_count >= 181) {
              obj.Authority = 'Cp_verifier'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 180 && responsive.data[a].leadverifiedList[n].remaining_count > 151) {
              obj.Authority = 'Planning'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 150 && responsive.data[a].leadverifiedList[n].remaining_count >= 121) {
              obj.Authority = 'SP'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 120 && responsive.data[a].leadverifiedList[n].remaining_count >= 91) {
              obj.Authority = 'RBH'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 90 && responsive.data[a].leadverifiedList[n].remaining_count >= 46) {
              obj.Authority = 'MSA'
            }
            else if (responsive.data[a].leadverifiedList[n].remaining_count <= 45 && responsive.data[a].leadverifiedList[n].remaining_count >= 1) {
              obj.Authority = 'MD'
            }
            else {
              obj.Authority = ''
            }
            modifyData.push(obj)
          }
        }
      }
      console.log(modifyData, "modifyData");
      this.rowData=modifyData
      let filterData_RoleWise=this.rowData.filter((res:any)=>res.Authority==this.authorityRole)
      this.rowData=filterData_RoleWise
    }
    )
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  getPenddingData(id: any) {
    this.showLoader = true;
    this._lmsUserManagementService.penddingCourse(id).subscribe(
      (res) => {

        this.showLoader = false;
        this.rowData = res.data
      }, (err) => {
        this.showLoader = false;

      }
    )
  }

  // rejectBtn(course: any, e: any) {
  //   e.stopPropagation();
  //   if (course) {
  //     Swal.fire({
  //       title: 'Are you sure to reject this course?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       cancelButtonColor: "#f44336",
  //       confirmButtonColor: "#3f51b5",
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const data = {
  //           course_request_status: 'NOT REQUEST',
  //           author_course_id: this.empId,
  //           employee_id: course.registered_user.employee_id
  //         };
  //         this._lmsUserManagementService.sendCourseRequest(course.traning_id, data).subscribe(
  //           (res) => {

  //             this.toster.success('Request Rejected successfully')
  //             this.reloadCurrentRoute();
  //           }, (err) => {
  //             // this.loading = false;
  //             this.toster.error('Something went wrong please try again', 'Error Message');
  //           })
  //       }
  //       else {


  //       }
  //     });
  //   }
  // }
  openDialog(data: any, e: any) {
    e.stopPropagation();
    console.log(data,e,"kkjkkj");
    const datas={
      key_data: data.to,
      lead_genration_id: data.lead_genration_id
    }
    this.myPendingTask.removeNotification(data.lead_genration_id,datas).subscribe((response:any)=>{
      console.log(response,"fater update");
      if(data.Authority==='Cp_verifier'){
        this.route.navigate(['master/audit/pre-audit/RA-TRA200'])
      }
      else if(data.Authority==='Planning_Team'){
        this.route.navigate(['master/audit/pre-audit/RA-TRA180'])
      } if(data.Authority==='Cp_verifier'){
        this.route.navigate(['master/audit/pre-audit/RA-TRA200'])
      } if(data.Authority==='Cp_verifier'){
        this.route.navigate(['master/audit/pre-audit/RA-TRA200'])
      }
    },
    (err)=>{
      this.toster.error("somthing wents wrong")
    })
    
    
    // const dialogRef = this.dialog.open(LmsApprovalDialogComponent, {
    //   data: { data, e }
    // });

    // dialogRef.afterOpened().subscribe(result => {
    // });
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }


  getCellValue(rowData: any) {

  }

  showSearchBox(searchBox: any) {
    searchBox.classList.toggle('showSearchBox')
    // 

    this.disabledSearchBox = !this.disabledSearchBox
    if (this.disabledSearchBox) {
      this.searchVal = '';
    };
  }
}
