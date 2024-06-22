import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { MatDialog } from '@angular/material/dialog';
import { ActionComponent } from '../employee/employee-list/action/action.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-leave-apply-create',
  templateUrl: './leave-apply-create.component.html',
  styleUrls: ['./leave-apply-create.component.scss'],
})
export class LeaveApplyCreateComponent implements OnInit {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  leaveForm: FormGroup;
  leaveData: any;
  form: any;
  remainingLeave: any;
  too: any;
  date: any;
  date1: any;
  leaveType: any;
  employeId: any;
  parm: any;
  getData: any;
  badReruest: any;
  loginUser:any;

  ngOnInit(): void {
    localStorage.setItem('employee_id:', 'undefined');
    this.empMaster
      .getLeaveByUserId(localStorage.getItem('EmpMainId'))
      .subscribe((res: any) => {
        this.rowData = res.data;
        
      }),
      this.activetedRoute.queryParams.subscribe((params) => {
        this.parm = params;
        this.employeId = this.parm.master_leave_id;
        
        if (this.employeId) {
          this.getByIdUse();
        }
      });

      let loginU:any = localStorage.getItem('signInUser')
      let nn = JSON.parse(loginU)
      this.loginUser = nn
  }
  back() {
    history.back();
  }
  goBack() {
    this.location.back();
  }

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private empMaster: EmpMasterService,
    private activetedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.rowClass = 'rowClass';

    this.leaveForm = this.fb.group({
      leave_id: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(localStorage.getItem('EmpMainId')),
      remaning_leave: new FormControl(null, [Validators.required]),
      reason: new FormControl(null),
    });
  }

  getByIdUse() {
    this.empMaster.applyLeaveGetById(this.employeId).subscribe((res: any) => {
      this.getData = res.data[0];
      
      this.basicFormPatch(this.getData);
    });
  }

  basicFormPatch(getData: any) {
    this.leaveForm.patchValue({
      leave_type: getData?.leave_type,
      fromDate: getData?.fromDate,
      toDate: getData?.toDate,
      remaning_leave: getData?.remaning_leave,
      reason: getData?.reason,
    });
    
  }

  leaveSelect(event: any) {
    this.leaveType = this.leaveForm.controls['leave_id'].value;
    

    // if (this.leaveType == 'CL') {
    //   // this.leaveForm.value =='3efregfrgr34';
    //   // this.leaveForm.controls['toDate'].value =='';
    //   this.leaveForm.controls['remaning_leave'].setValue(7);
    // }
    // else if(this.leaveType == 'EL'){
    //   this.leaveForm.controls['remaning_leave'].setValue(18);
    //   this.leaveForm.controls['fromDate'].value =='';
    //   this.leaveForm.controls['toDate'].value =='';
    // }
    // else if(this.leaveType == 'SL'){
    //   this.leaveForm.controls['fromDate'].value =='';
    //   this.leaveForm.controls['toDate'].value =='';
    // }
    // 
  }

  from(event: any) {
    // this.empMaster.applyLeaveRemainingCreate(this.leaveForm.value).subscribe((res: any) => {
    //   this.remainingLeave = res.data.remaning_leave;
    //   this.leaveForm.controls['remaning_leave'].setValue(this.remainingLeave);
    // })
  }

  to(event: any) {
    if (
      this.leaveForm.controls['fromDate'].value ==
      this.leaveForm.controls['toDate'].value
    ) {
      alert('The Value Is Same');
    }
    
    this.empMaster.applyLeaveRemainingCreate(this.leaveForm.value).subscribe(
      (res: any) => {
        
        this.remainingLeave = res.data;
        if (this.remainingLeave < 0) {
          this.toast.error('You are not Applicable for Extra Leave');
          this.leaveForm.controls['remaning_leave'].setValue('');
        } else {
          
          this.leaveForm.controls['remaning_leave'].setValue(
            this.remainingLeave
          );
        }
      },
      (err) => {
        if (err.code === 400) {
          
          this.toast.error(err.message);
          this.badReruest = err.statusText;
        } else if (err.status == 500) {
          this.toast.error('bad request ');
        } else {
          this.toast.error('Something Went Wrong!!');
        }
      }
    );
  }

  onSubmitForm() {
    // let emplyerName=
    
    if (this.leaveForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
    let val = this.leaveForm.value;
    // 
    let data = {
      leave_id: val.leave_id,
      fromDate: val.fromDate,
      toDate: val.toDate,
      employee_id: this.loginUser.employee_id,
      remaning_leave: val.remaning_leave,
      reason: val.reason,
      applier_name: this.loginUser.first_name
    };
    this.empMaster.leaveCreate(data).subscribe(
      (res: any) => {
        
        if (res.code == 200) {
          this.toast.success(res.message);
          this.router.navigate(['master/hrms/employee-master/leave-apply']);
        }
      },
      (err) => {
        if (err.status === 400) {
          
          this.toast.error(err.error.message);
        } else if (err.status == 500) {
          this.toast.error('bad request ');
        } else {
          this.toast.error('Something Went Wrong!!');
        }
      }
    );
  }

  onUpdateForm() {
    this.empMaster
      .updateApplyLeave(this.employeId, this.leaveForm.value)
      .subscribe((res: any) => {
        // this.update=res
        
        this.toast.success('Leave Apply Updated successfully..');
        const latlang = { id: this.employeId };
        this.router.navigate(['master/hrms/employee-master/leave-apply'], {
          queryParams: latlang,
        });
      });
  }

  public columnDefs = [
    {
      headerName: 'S.NO',
      field: 'i',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      valueGetter: 'node.rowIndex+1',
      flex: 1,
    },
    {
      headerName: 'Leave Type',
      field: 'leave_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Total Leave Count',
      field: 'count',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
    },
    {
      headerName: 'Remaining Leave',
      field: 'remaning_leave',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    {
      headerName: 'Status',
      field: 'remaning_leave',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      cellRenderer: (params: any) => (params.value == 0 ? 'Close' : 'Open'),
      cellStyle: (params: any) => {
        if (params.value === 0) {
          return { color: 'red', fontSize: '16px' };
        } else {
          return { color: 'green', fontSize: '16px' };
        }
        return null;
      },
    },
    // {
    //   headerName: 'Action',
    //   field: 'employee_id',
    //   cellRenderer: ActionComponent,
    //   cellRendererParams: {
    //     className: 'mat-blue',
    //     hideRequestButton: true,
    //     hideDetailsButton: false,
    //     hideDownloadIcon: false,
    //     showCustomIcon: false, // Hide attachment icon
    //   },
    // }
  ];

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
}
