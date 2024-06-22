import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NotificationServiceService } from 'src/app/@shared/services/notification/notification-service.service';

@Component({
  selector: 'app-system-send-notification',
  templateUrl: './system-send-notification.component.html',
  styleUrls: ['./system-send-notification.component.scss']
})
export class SystemSendNotificationComponent implements OnInit {
  form: FormGroup;
  fff: any;
  imageToUpload: any;
  imageToUpload1: any;
  imagePath: any;
  imagePath1: any;
  data1: any;
  getData: any;
  // data:any;
  dddd: any = '';
  productDataId: any;
  notification: any = "CSP";
  getLeadbyID: any;
  patch_value: any;
  lead_id: any;
  higherAuthorityComment: any;
  sendTo: any = "Send to CSP"
  suspensionList: any = 'no';
  notifications: any;
  notification_id: any;
  type: any;
  cspComment: boolean;
  withdrawlAtt: boolean;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  types: any;
  assignBy: any;
  Emp_id_noti: any;
  Emp_name_noti: any;
  Emp_role_noti: any;
  Emp_mail_noti: any;
  Emp_roleID_noti: any;
  res1: any;
  higer_authorityName: any;
  stringBeforeAmpersand: any;
  companyName: any;
  constructor(private fb: FormBuilder,
    private _lmsNotification: NotificationServiceService,
    private router: Router,
    private location: Location,
    private config_service: ConfigurationalmasterService,
    private activateRoute: ActivatedRoute,
    private leadService: LeadService,
    private toast: ToastrService,) {
    this.activateRoute.queryParams.subscribe((res: any) => {
      this.assignBy = res.assignby
  
      this.higer_authorityName = res.notification

      //
      const inputString =  this.higer_authorityName;
      const parts = inputString.split('&');
      if (parts.length > 1) {
        this.stringBeforeAmpersand = parts[0].trim();
        console.log(this.stringBeforeAmpersand);
      } else {
        this.stringBeforeAmpersand=this.higer_authorityName
      }
      //
      if (this.types = "RA-TRA45") {
        this.types = "MD"
        this.higherAuthorityComment = "MD"
      }
      if (res.notification == 'CSP & Planning') {
        this.type = 'CSP & Planning'
        this.stringBeforeAmpersand='Planning Team'
      }
      else if (res.notification == 'SP & CSP') {
        this.type = 'SP & CSP'
        this.higherAuthorityComment = "SP Team"
        this.suspensionList = 'Suspense'
      }
      else if (res.notification == 'RBH & CSP') {
        this.cspComment = true
        this.type = 'RBH & CSP'
        this.higherAuthorityComment = "RBH"
      }
      else if (res.notification == 'MSA Head & CSP') {
        this.cspComment = true
        this.type = 'MSA Head & CSP'
        this.higherAuthorityComment = "MSA Head"
      }
      else if (res.notification == 'MD & CSP') {
        this.cspComment = true
        this.type = 'MD & CSP'
        this.higherAuthorityComment = "MD"
      }
      else if (res.notification == 'post_audit') {
        this.cspComment = true
        this.type = 'post_audit'
        this.sendTo = "send to Customer"
      }
      else if (res.notification == 'RBH') {
        this.cspComment = true
        this.type = 'RBH'
        this.sendTo = "send to CSP"
      }
      else if (res.notification == 'notify_planing_to_postAudit') {
        this.cspComment = true
        this.type = 'notify_planing_to_postAudit'
        this.higherAuthorityComment = "Planning"
        this.sendTo = "send to Post-Audit Teams"
      }
      else if (res.notification == 'widthdrwal') {
        this.cspComment = true
        this.type = 'widthdrwal'
        this.notifications = res.notification
        this.higherAuthorityComment = "Post Audit Team"
        this.sendTo = "send to RBH Approval"
        this.notification_id = res.notification_id
      }
      else if (res.notifications == 'rbh_approval') {
        this.withdrawlAtt = true
        this.type = 'rbh_approval'
        this.notifications = res.notifications
        this.higherAuthorityComment = "RBH"
        this.sendTo = "Approval"
        this.notification_id = res.notification_id
      }
      else if (res.notification == 'sus_date') {
        this.cspComment = true
        this.type = 'sus_date'
        this.higherAuthorityComment = "Planning Team"
        this.suspensionList = 'Suspense'
      }

      this.notification = res.notification,
        this.lead_id = res.lead_generate_id,
        // 
        this.getByIdLead_notification(this.lead_id)

    })

    this.form = this.fb.group({
      certificate_id: new FormControl('', Validators.required),
      BR_id: new FormControl('', Validators.required),
      Stander_id: new FormControl('', Validators.required),
      other_standard_program_assement: new FormControl('', Validators.required),
      Cer_valid_date: new FormControl(''),
      RA_TRA_date: new FormControl(''),
      Notification_CIF: new FormControl(''),
      industry_code: new FormControl('', Validators.required),
      sort_name: new FormControl('', Validators.required),
      email_id: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
      commentAsPerCSP: new FormControl('', Validators.required),
      rejectComment: new FormControl('', Validators.required),
      withdrawalLetter: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.assignBy, "this.assignBy");
    this.getEmployee_information(this.assignBy)
    this.form.controls['reason'].patchValue('dueDate')
  }

  getByIdLead_notification(leadID: any) {
    this.leadService.getByIdLead_notification(leadID).subscribe((res: any) => {
      this.companyName=res.data.associated_company
      this.getLeadbyID = res.data
      this.patch_value = this.form.patchValue({
        certificate_id: this.getLeadbyID.certificate_id,
        BR_id: this.getLeadbyID.br_number,
        Stander_id: this.getLeadbyID.standard_program_assement,
        other_standard_program_assement: this.getLeadbyID.other_standard_id,
        Cer_valid_date: this.getLeadbyID.valid_until,
        // RA_TRA_date: this.getLeadbyID.,
        // Notification_CIF: this.getLeadbyID.,
        industry_code: this.getLeadbyID.industry_code_id,
        sort_name: this.getLeadbyID.sort_name,
        email_id: this.getLeadbyID.email,
        // reason: this.getLeadbyID.,
        commentAsPerCSP: this.getLeadbyID.remarks,
      })
    })

  }

  productSave(forms: any) {
    let commentf: any = [
      { comment: this.form.value.comments, type: this.types }
    ];
    const data = {
      certificate_type: this.form.value.certificate_id,
      br_number: this.form.value.BR_id,
      email_id: this.form.value.email_id,
      Stander_id: this.form.value.Stander_id,
      all_comments: commentf,
      reason1: this.form.value.reason,
      hight_authority_comments: this.higherAuthorityComment,
      lead_genration_id: Number(this.lead_id),
      forCSP: "csp",
      suspension_list: this.suspensionList,
      loginId: Number(this.loginUserId),
      status: "Verified DQS Data"
    }
    this.leadService.notificationUpdatedListByLead_id(this.lead_id, data)
      .subscribe((res: any) => {
        if (this.type = 'CSP & Planning') {
          this.toast.success("Notification Send Successfully..")
          this.router.navigate(['master/audit/pre-audit/RA-TRA200'])
          this.create_notification()

        }
        else if (this.type = 'SP & CSP') {
          this.toast.success("Notification Send Successfully..")
          this.router.navigate(['master/audit/pre-audit/RA-TRA150'])
          this.create_notification()

        }
        else if (this.type = 'RBH & CSP') {
          this.toast.success("Notification Send Successfully..")
          this.router.navigate(['master/audit/pre-audit/RA-TRA120'])
          this.create_notification()

        }
        else if (this.type = 'MSA Head & CSP') {
          this.toast.success("Notification Send Successfully..")
          this.router.navigate(['master/audit/pre-audit/RA-TRA90'])
          this.create_notification()

        }
      },
        (error) => {
          this.toast.error("Somthing Wents wrong")

        })

    if (this.form.invalid) {
      // this.toast.error('Enter Required Field', 'Something Went Wrong')
      return;
    }
    let val = this.form.value;
  }
  sendTo_RBH(forms: any) {
    const data = {
      certificate_type: this.form.value.certificate_id,
      // associated_company:this.form.value.,
      br_number: this.form.value.BR_id,
      email_id: this.form.value.email_id,
      Stander_id: this.form.value.Stander_id,
      // other_expence:this.form.value.,
      // ara_report_received_date:this.form.value.,
      // industry_sector:this.form.value.,
      // hight_authority_comments:this.form.value.,
      // hight_authority_comments:this.form.value.,
      comments1: this.form.value.comment,
      reason1: this.form.value.reason,
      hight_authority_comments: this.higherAuthorityComment,
      lead_genration_id: Number(this.lead_id),
      forCSP: "RBH",
      suspension_list: this.suspensionList,
    }
    this.leadService.notificationUpdatedListByLead_id(this.lead_id, data)
      .subscribe((res: any) => {
        this.toast.success("Successfully send");
        this.create_notification()

        this.location.back();
      },
        (error) => {
          this.toast.error("Somthing Wents wrong")

        })
    const datas = {
      status: " Waiting for RBH Approval",
      lead_genration_id: Number(this.lead_id),
    }
    this.leadService.updatewidthdrawalstatus(this.notification_id, datas)
      .subscribe((res: any) => {
        this.create_notification()


      },
        (error) => {
          this.toast.error("Somthing Wents wrong")

        })

    if (this.form.invalid) {
      // this.toast.error('Enter Required Field', 'Something Went Wrong')
      return;
    }
    let val = this.form.value;
  }

  approve(e: any) {

    Swal.fire({
      title: `Approval for widthdrwal`,
      text: 'Are you sure to approval this widthdrawal?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Skip'
    }).then((result: any) => {


      if (result.isConfirmed) {

        const datas = {
          status: "Approval by RBH",
          lead_genration_id: Number(this.lead_id),
        }
        this.leadService.updatewidthdrawalstatus(this.notification_id, datas)
          .subscribe((res: any) => {
            this.create_notification()

          },
            (error) => {
              this.toast.error("Somthing Wents wrong")

            })
      }
      else {

      }
    })
  }
  reject(e: any) {

    Swal.fire({
      title: `Reject for widthdrwal`,
      text: 'Are you sure to reject this widthdrawal?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Skip'
    }).then((result: any) => {


      if (result.isConfirmed) {

        const datas = {
          status: "Reject by RBH",
          lead_genration_id: Number(this.lead_id),
        }
        this.leadService.updatewidthdrawalstatus(this.notification_id, datas)
          .subscribe((res: any) => {

          },
            (error) => {
              this.toast.error("Somthing Wents wrong")

            })
      }
      else {

      }
    })
  }
  contentVideo(e: any) {
    let fileData: FileList = e.target.files;
    // this.uploadVideo = fileData.item(0);
    // 
  }
  goBack() {
    this.location.back();

  }

  getEmployee_information(id: any) {
    this._lmsNotification.get_EmployeeDetails(id).subscribe((res: any) => {
      console.log(res, "information emp");
      // this.companyName=res.data.associated_company
      this.Emp_id_noti = id
      this.Emp_name_noti = res.data.first_name
      this.Emp_mail_noti = res.data.employee_official_email
      this.Emp_role_noti = res.data.user_role
      this.Emp_roleID_noti = res.data.role_master_id
    })
  }
  create_notification() {
    let data =
      [
        {
          employee_id: this.Emp_id_noti,
          emp_name: this.Emp_name_noti,
          employee_official_email: this.Emp_mail_noti,
          role: this.Emp_role_noti,
          role_id: this.Emp_roleID_noti,
          type: 'Advance Planning',
          remark: `Please check Adv. CSP Notification Module on Pre-Audit for Company Name:${this.companyName}`,
          subject: "Regarding for Adv. CSP Notification Module on Pre-Audit",
          textData: `
    Dear ${this.Emp_name_noti}, <br>
         It is informed to you that please check Adv. CSP Notification Module on Pre-Audit for further Action and contact to customer of company <b> ${ this.companyName} </b>.
          <br>   Regards, <br>
          ${this.stringBeforeAmpersand}
    `,
        }
      ]
    this._lmsNotification.create_notification(data).subscribe((responsive: any) => {
      console.log(responsive);
      // this.toast.success("noti")
      this.res1 = responsive
    },
      // (error)=>{
      //   this.toast.error("Somthing went wrong","ERROR")

      // }
    )
  }


}
