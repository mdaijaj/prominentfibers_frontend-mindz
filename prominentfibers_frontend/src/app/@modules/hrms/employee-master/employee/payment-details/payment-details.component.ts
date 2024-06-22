import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { MustMatch } from 'src/app/@shared/validators/must-match.validator';
import { Location } from '@angular/common';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'],
})
export class PaymentDetailsComponent {
  submitted: boolean = false;
  employeData: any;
  id: any;
  empId: any;
  singlePaymentData: any;
  allBanks: any;

  constructor(
    private fb: FormBuilder,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private route: Router,
    private employService: EmpRegistrationService,
    private locatin: Location
  ) {}

  paymentForm = this.fb.group(
    {
      bank_name: new FormControl(null, [Validators.required]),
      emp_name_in_bank: new FormControl(null, [Validators.required]),
      branch_address: new FormControl(null, [Validators.required]),
      account_number: new FormControl(null, [Validators.required]),
      reEnterName: new FormControl(null,  [Validators.required]),
      ifsc_code: new FormControl(null, [Validators.required,Validators.maxLength(11)]),
      pf_number: new FormControl(null,[Validators.pattern('([A-Z]){5}([0-9]){17}$')]),
      // gst_number: new FormControl(null, [Validators.pattern('([0-9]){2}([A-Z]){5}([0-9]){4}([A-Z]){1}([0-9]){1}([A-Z]){1}([0-9]){1}$'),]),

      uan_number: new FormControl(null,),
    },
    {
      validator: MustMatch('account_number', 'reEnterName'),
    }
  );
  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      
      this.empId = params.employee_id;
      if (params.employee_id) {
        
        this.getSinglePaymentDetails(params.employee_id);
      } else {
        
        // this.route.navigate(['/hrms/employee-master/employ'])
      }
    });
    this.getAllBanks();
    this.employService.setEmpTitle('PAYMENT DETAILS');
  }

  onCreate() {
    // this.route.navigate(['hrms/employee-master/employ/employee-create//document-details']);

    if (this.paymentForm.invalid) {
      this.toastr.error("Required fields should not be empty",)
      return;
    }
    this.submitted = true;
    let val = this.paymentForm.value;

    
    // if (this.paymentForm.invalid) {
    //   // alert('invalid')
    //   this.toastr.error('Invalid form');
    //   return;
    // }

    const data: any = {
      bank_name: val.bank_name,
      empbank_id: val.bank_name,
      emp_name_in_bank: val.emp_name_in_bank,
      branch_address: val.branch_address,
      account_number: val.account_number,
      ifsc_code: val.ifsc_code,
      pf_number: val.pf_number,
      uan_number: val.uan_number,
      employee_id: this.empId,
    };

    if (!this.singlePaymentData) {
      this.employService.paymentdetailsCreate(data).subscribe(
        (res: any) => {
          this.employeData = res;
          
          this.toastr.success('Created Successfuly');
          this.route.navigate(
            [
              'master/hrms/employee-master/employ/employee-create/document-details',
            ],
            { queryParams: { employee_id: this.empId } }
          );
        },
        (err) => {
          
          this.toastr.error(
            'Someting went wron please try again',
            'Error Message'
          );
        }
      );
    } else {
      this.employService.paymentdetailsUpdate(this.empId, data).subscribe(
        (res: any) => {
          this.employeData = res;
          
          this.toastr.success('Updated Successfuly');
          this.route.navigate(
            [
              'master/hrms/employee-master/employ/employee-create/document-details',
            ],
            { queryParams: { employee_id: this.empId } }
          );
        },
        (err) => {
          
          this.toastr.error(
            'Something went wron please try again',
            'Error Message'
          );
        }
      );
    }
  }
  getAllBanks() {
    this.employService.getAllBanks().subscribe(
      (res) => {
        
        this.allBanks = res.data;
      },
      (err) => {
        
      }
    );
  }

  getSinglePaymentDetails(id: any) {
    console.log(id);
    
    this.employService.getSinglePaymentDetails(id).subscribe(
      (res: any) => {
        this.singlePaymentData = res.data;
        
        
console.log(res.data);

        this.patchValueInPaymentForm(res.data);
      },
      (err) => {
        
      }
    );
  }
  patchValueInPaymentForm(data: any) {
    console.log(data,'data');
    
    this.paymentForm.patchValue({
      bank_name: data.empbank_id||Number(data.bank_name),
      emp_name_in_bank: data.emp_name_in_bank||data.employee_name_in_bank,
      branch_address: data.branch_address||data.bank_address,
      account_number: data.account_number,
      reEnterName: data.account_number,
      ifsc_code: data.ifsc_code,
      pf_number: data.pf_number,
      uan_number: data.uan_number||data.UAN_number,
    });
  }
  Skip() {
    this.route.navigate(
      ['master/hrms/employee-master/employ/employee-create/document-details'],
      { queryParams: { employee_id: this.empId } }
    );
  }
}
