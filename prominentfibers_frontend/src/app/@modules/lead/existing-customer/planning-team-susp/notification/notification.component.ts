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
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
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
  response: any;
  notification_data: any;
  courseNAme: any;
  post_audit_emps: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private config_service: ConfigurationalmasterService,
    private activateRoute: ActivatedRoute,
    private leadService: LeadService,
    private _notification: NotificationServiceService,
    private toast: ToastrService,) {
    this.activateRoute.queryParams.subscribe((res: any) => {
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
    this.form.controls['reason'].patchValue('dueDate')
    this.getEmployee_information();

  }

  getByIdLead_notification(leadID: any) {
    this.leadService.getByIdLead_notification(leadID).subscribe((res: any) => {
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
    let comment: any = [
      { comment: this.form.value.comments, type: this.types }
    ];
    const data = {
      certificate_type: this.form.value.certificate_id,
      comment: this.form.value.comment,
      br_number: this.form.value.BR_id,
      email_id: this.form.value.email_id,
      Stander_id: this.form.value.Stander_id,
      all_comments: comment,
      reason1: this.form.value.reason,
      hight_authority_comments: this.higherAuthorityComment,
      lead_genration_id: Number(this.lead_id),
      forCSP: "csp",
      suspension_list: "Suspense",
      loginId: Number(this.loginUserId),
      status: "Verified DQS Data"
    }
    this.leadService.notificationUpdatedListByLead_id(this.lead_id, data)
      .subscribe((res: any) => {
        this.toast.success("Notification Send Successfully..")
        this.router.navigate(['master/lead/existing-customer/planning-team-susp'])
        this.userData_notification();
      },
        (error) => {
          this.toast.error("Somthing Wents wrong")
        })

    let val = this.form.value;
  }
  goBack() {
    this.location.back();
  }
  getEmployee_information() {
    this._notification.getAll_EmployeeDetails().subscribe((res: any) => {
      console.log(res, "information emp");
      const filterEmp = res.data.filter((response: any) => response.designation == "Post Audit").map((res1: any) => res1.employee_id)
      console.log(filterEmp, "filterEmp");
      this.post_audit_emps = filterEmp
    })
  }

  userData_notification() {
    let emp_details: any = []
    for (let a = 0; a < this.post_audit_emps.length; a++) {
      console.log(this.post_audit_emps, "aaaaaaaaaaaaaaaa");
      this._notification.get_EmployeeDetails(this.post_audit_emps[a]).subscribe((res: any) => {
        emp_details.push({
          emp_name: res.data.first_name,
          employee_id: res.data.employee_id,
          role: res.data.user_role,
          role_id: res.data.role_master_id,
          type: 'Advance Planning',
          employee_official_email: res.data.employee_official_email,
          remark: `You have assigned for ${this.courseNAme}`,
          subject: `Regarding assing ${this.courseNAme} course `,
          textData: `
          Dear ${res.data.first_name}, <br> It is informed to you that you have assinged ${this.courseNAme} course. <br>
          Regards,<br>
          ${this.loginUserName}
          `,
        })
        this.notification_data = emp_details
        console.log(this.notification_data, "emp_details");
        this._notification.create_notification(this.notification_data).subscribe((responsive: any) => {
          console.log(responsive,"responsive");
        },)
      })
    }
  }
}
