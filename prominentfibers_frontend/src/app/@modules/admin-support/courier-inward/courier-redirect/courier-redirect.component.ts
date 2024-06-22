import { ɵNullViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-courier-redirect',
  templateUrl: './courier-redirect.component.html',
  styleUrls: ['./courier-redirect.component.scss']
})
export class CourierRedirectComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_inward_Form: FormGroup;
  inward_id: any;
  id: any;

  public status = [
    { id: 1, name: 'Accepted' },
    { id: 2, name: 'Rejected' },

  ];

  remaks: boolean = false;
  singleInwardData: any;
  reject: boolean;
  redirect: boolean;
  empdata: any;
  FromDate: string;
  empDetails: any;
  emp_id: any;
  serviceData: any;
  containsData: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private adminService: AdminSupportService,
    private activeroute: ActivatedRoute,
    private _configurationalMasterService: ConfigurationalmasterService,

  ) {
    this.rowClass = 'rowClass';

    this.create_inward_Form = this.fb.group({
      whom:new FormControl(null, [Validators.required]),
      addressed_to_whom: new FormControl(null),
      department: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      senders_name: new FormControl(null, [Validators.required]),
      senders_address: new FormControl(null, [Validators.required]),
      courier_contain: new FormControl(null, [Validators.required]),
      courier_service_name: new FormControl(null, [Validators.required]),
      consignment_number: new FormControl(null, [Validators.required]),
      received_By: new FormControl(null, [Validators.required]),
      received_date: new FormControl(null, [Validators.required]),
      handover_By: new FormControl(ɵNullViewportScroller),
      handover_date: new FormControl(null),
      inward_status: new FormControl(null, [Validators.required]),
      handover_to_whom: new FormControl(null),
      remark: new FormControl(null),
      accepted_date: new FormControl(null),
      rejected_date: new FormControl(null),
      redirect_date:new FormControl(null),
      redirected_email: new FormControl(null),
      redirected_whom: new FormControl(null),
    });
  }

  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    console.log('loginUser', loginUser);
    this.emp_id = loginUser.employee_id;
    console.log('innward-id', this.emp_id);

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.inward_id = params.id;
      console.log('innward-id', this.inward_id);
    })

    this.adminService.courier_getById(this.inward_id).subscribe(
      (res: any) => {
        this.singleInwardData = res.data;
        if(this.singleInwardData?.inward_status == 'Accepted'){
          this.remaks = true;
        }
        if (this.singleInwardData?.inward_status == 'Rejected') {
          this.reject = true;
        }
        if (this.singleInwardData?.inward_status == 'Re-Directed') {
          this.redirect = true;
        }
        console.log('singleInwardData', this.singleInwardData);
        this.create_inward_Form.patchValue({
          addressed_to_whom: this.singleInwardData.addressed_to_whom,
          department: this.singleInwardData?.department,
          email: this.singleInwardData?.email,
          senders_name: this.singleInwardData?.senders_name,
          senders_address: this.singleInwardData?.senders_address,
          courier_contain: this.singleInwardData?.courier_contain,
          courier_service_name: this.singleInwardData?.courier_service_name,
          consignment_number: this.singleInwardData?.consignment_number,
          received_By: this.singleInwardData?.received_By,
          received_date: this.singleInwardData?.received_date,
          handover_By: this.singleInwardData?.handover_By,
          handover_date: this.singleInwardData?.handover_date,
          handover_to_whom: this.singleInwardData?.handover_to_whom,
          remark: this.singleInwardData?.remark,
          inward_status:this.singleInwardData?.inward_status,
          accepted_date: this.singleInwardData?.accept_reject_date,
          rejected_date: this.singleInwardData?.accept_reject_date,
          remarks: this.singleInwardData?.remarks,
          Redirected_email: this.singleInwardData?.Redirected_email,
          redirected_whom: this.singleInwardData?.redirected_whom,
          redirect_date: this.singleInwardData?.accept_reject_date,

        });
       
      },
      (err) => {
        this.toast.warning(err.error.message);
      }
    );
    this.create_inward_Form.controls['whom'].patchValue(Number(this.emp_id))

    this.adminService.getAllEmp().subscribe((res: any) => {
      this.empdata = res.data;
    });

    this._configurationalMasterService.getAllCourier().subscribe((res:any)=>{
      this.serviceData = res.data;
    })

    this._configurationalMasterService.getAllContains().subscribe((res:any)=>{
      this.containsData = res.data;
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  changeStatus(e: any) {
    if (e.value == 'Accepted') {
      this.remaks = true;
    } else {
      this.remaks = false;
    }

    if (e.value == 'Rejected') {
      this.remaks = false;
      this.reject = true;
    } else {
      this.reject = false;
    }

    if (e.value == 'Re-Directed') {
      this.remaks = false;
      this.reject = false;
      this.redirect = true;
    } else {
      this.redirect = false;
    }
  }

  updateInward() {
    let val = this.create_inward_Form.value;
    if(val.inward_status == 'Re-Directed'){
      let data ={ 
        inward_status:val.inward_status,
        redirected_whom:val.redirected_whom,
        Courier_Inward_id: this.singleInwardData?.Courier_Inward_id,
        redirected_email:val.redirected_email,
        redirect_date: val.redirect_date,
        remark:val.remark,
      }
      this.adminService
      .courier_redirect(this.emp_id, data)
      .subscribe((res: any) => {
        if (res.code == 200) {
          this.route.navigate([
            'master/admin-support/courier-inward',
          ]);
          this.toast.success(res.message);
        }
      },(err) => {
        this.toast.warning(err.error.message);
        console.log(err);
        
      });
      return
    }

    if(val.inward_status == 'Accepted'){
      let data ={ 
        inward_status:val.inward_status,
        Courier_Inward_id: this.singleInwardData?.Courier_Inward_id,
        accept_date: val.accepted_date,
      }
      this.adminService
      .courier_Accept(this.emp_id, data)
      .subscribe((res: any) => {
        if (res.code == 200) {
          this.route.navigate([
            'master/admin-support/courier-inward',
          ]);
          this.toast.success(res.message);
        }
      },(err) => {
        this.toast.warning(err.error.message);
        console.log(err);
        
      });
    }
    else{
      let data ={
        inward_status:val.inward_status,
        Courier_Inward_id: this.singleInwardData?.Courier_Inward_id,
        rejected_date: val.rejected_date,
        remark:val.remark,
      }
      this.adminService
      .courierReject(this.emp_id, data)
      .subscribe((res: any) => {
        if (res.code == 200) {
          this.route.navigate([
            'master/admin-support/courier-inward',
          ]);
          this.toast.success(res.message);
        }
      },(err) => {
        this.toast.warning(err.error.message);
        console.log(err);
        
      });
    }
  
  }

  selectRedirectedToWhom(e:any){
    this.adminService.getByIdEmp(e.value).subscribe((res:any)=>{
      this.empDetails= res.data;
      console.log('empDetails',this.empDetails);
      this.create_inward_Form.patchValue({
        redirected_email:this.empDetails.employee_official_email,
      })
    })
  }

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  minDate = moment({ year: this.year - 0, month: this.month, date: this.date }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
}
