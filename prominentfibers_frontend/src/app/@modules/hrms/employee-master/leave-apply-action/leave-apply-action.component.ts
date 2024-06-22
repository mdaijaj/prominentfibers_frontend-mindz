import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ApplyLeaveDialogComponent } from '../leave-apply-list/apply-leave-dialog/apply-leave-dialog.component';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-leave-apply-action',
  templateUrl: './leave-apply-action.component.html',
  styleUrls: ['./leave-apply-action.component.scss']
})
export class LeaveApplyActionComponent  implements OnInit {
  leave_id: any;

  constructor(private route: Router,
    public dialog: MatDialog,
    private emp_master : EmpMasterService,
    private toast : ToastrService,  private _rabcService:RbacMasterService,) {
  }

  ngOnInit(): void {
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    this.leave_id=params.data.emp_leave_id
    return params.valueFormatted ? params.valueFormatted : params.data.emp_leave_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e:any) {
    e.stopPropagation();
    // 
    this.route.navigate(['master/hrms/employee-master/leave-apply-form'], { queryParams: { emp_leave_id: this.cellValue } })
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }

//   delete(e:any){
//     // e.stopPropagation();
//     // if (confirm('Are you sure you want to Delete this thing into the database?')) {
//     //   this.emp_master.deleteApplyLeave(this.cellValue).subscribe(res=>{
//     //     this.toast.success("Grievancy Data is Deleted Successfully!");
//     //     window.location.reload();
//     //    })
//     // } else {
//     //   // Do nothing!
//     //   
//     // }
//     e.stopPropagation();
// //  Swal.fire({
// //     title: 'Are you sure want to remove?',
// //     text: 'You will not be able to recover this file!',
// //     icon: 'warning',
// //     showCancelButton: true,
// //     cancelButtonColor: "#f44336",
// //     confirmButtonColor: "#3f51b5",
// //     confirmButtonText: 'Yes, delete it!',
// //     cancelButtonText: 'No, keep it'
// //   }).then((result) => {
// //     if (result.value) {
      
// //       // Swal.fire(
// //       //   'Deleted!',
// //       //   'Your imaginary file has been deleted.',
// //       //   'success'
// //       // )
// //     } else if (result.dismiss === Swal.DismissReason.cancel) {
// //       // Swal.fire(
// //       //   'Cancelled',
// //       //   'Your imaginary file is safe :)',
// //       //   'error'
// //       // )
// //     }
// //   })
// 

// this.emp_master.deleteLeaveApply(this.leave_id).subscribe((res: any) => {
//   //       this.checkedAuther = res;
//   window.location.reload();

// })
//   }
  openDialog() {
    const dialogRef
      = this.dialog.open(ApplyLeaveDialogComponent, {
        // width: '100%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        panelClass: 'full-screen-modal',
        data: { id: this.cellValue }
      });
    // dialogRef.afterClosed().subscribe(result => {
    //   
    // });
  }
}
