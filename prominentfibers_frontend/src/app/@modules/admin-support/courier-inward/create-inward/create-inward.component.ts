import { ɵNullViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AdminSupportService } from 'src/app/@shared/services/admin-support.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-create-inward',
  templateUrl: './create-inward.component.html',
  styleUrls: ['./create-inward.component.scss'],
})
export class CreateInwardComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  create_inward_Form: FormGroup;
  inward_id: any;
  id: any;
  public status = [
    { id: 1, name: 'Received' },
    { id: 2, name: 'Accepted' },
    { id: 3, name: 'Rejected' },
    { id: 4, name: 'Re-Directed' },
    { id: 5, name: 'Handover' },
    { id: 6, name: 'Returned' },
    { id: 7, name: 'Re-Send' },
    { id: 8, name: 'Locked' },
  ];

  remaks: boolean = false;
  singleInwardData: any;
  empdata: any;
  empDetails: any;
  user_id: any;
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
      whom: new FormControl(null, [Validators.required]),
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
      handover_By: new FormControl(null),
      handover_date: new FormControl(null),
      inward_status: new FormControl(null, [Validators.required]),
      handover_to_whom: new FormControl(null),
      remarks: new FormControl(null),
      web_site_url: new FormControl(window.location.origin +'/master/admin-support/courier-inward/courier-acceptance-rejection',),
      emp_id : new FormControl(null),
    });
  }

  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    console.log('loginUser', loginUser);
    this.user_id = loginUser.employee_id;

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.inward_id = params.id;
      console.log('innward-id', this.inward_id);
      if(this.inward_id){
        this.adminService
          .get_inward_ById(this.inward_id)
          .subscribe((res: any) => {
            this.singleInwardData = res.data;
            this.create_inward_Form.patchValue({
              addressed_to_whom: this.singleInwardData.addressed_to_whom,
              department: this.singleInwardData.department,
              email: this.singleInwardData.email,
              contact_number: this.singleInwardData.contact_number,
              senders_name: this.singleInwardData.senders_name,
              senders_address: this.singleInwardData.senders_address,
              courier_contain: this.singleInwardData.courier_contain,
              courier_service_name: this.singleInwardData.courier_service_name,
              consignment_number: this.singleInwardData.consignment_number,
              received_By: this.singleInwardData.received_By,
              received_date: this.singleInwardData.received_date,
              handover_By: this.singleInwardData.handover_By,
              handover_date: this.singleInwardData.handover_date,
              inward_status: this.singleInwardData.inward_status,
              handover_to_whom: this.singleInwardData.handover_to_whom,
              remarks: this.singleInwardData.remarks,
            });
          });
      }
    });

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

  createInward() {
    if (this.create_inward_Form.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      return;
    }

    let val = this.create_inward_Form.value;
    console.log('val', val);

    this.adminService.createInward(this.user_id, val).subscribe((res: any) => {
      if (res.code == 200) {
        this.route.navigate([
          'master/admin-support/courier-inward/courier-inward-list',
        ]);
        this.toast.success(res.message);
      }
    },(err) => {
      this.toast.warning(err.error.message);
    });
  }

  changeStatus(e:any){
    if(e.value == 'Rejected'){
      this.remaks = true;
    }else{
      this.remaks = false;
    }
  }


  updateInward() {
    let val = this.create_inward_Form.value;
    let data = {
        Courier_Inward_id:this.inward_id,
        handover_By: val.handover_By,
        handover_date: val.handover_date,
        inward_status: val.inward_status,
        handover_to_whom: val.handover_to_whom,
        remarks: val.remarks,
    };
    this.adminService
      .courier_status_Admin(this.user_id, data)
      .subscribe((res: any) => {
        if (res.code == 200) {
          this.route.navigate([
            'master/admin-support/courier-inward/courier-inward-list',
          ]);
          this.toast.success(res.message);
        }
      },(err)=>{
        this.toast.error(err.error.message);
      });
  }

  selectWhom(e:any){
    this.adminService.getByIdEmp(e.value).subscribe((res:any)=>{
      this.empDetails= res.data;
      console.log('empDetails',this.empDetails);
      this.create_inward_Form.patchValue({
        department:this.empDetails.department,
        emp_id:this.empDetails.employee_id,
        addressed_to_whom: this.empDetails.fullName,
        email:this.empDetails.employee_official_email,
      })
    })
  
  }
}
