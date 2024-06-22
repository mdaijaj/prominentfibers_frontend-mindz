import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
// import { EmpListDialogComponent } from '../emp-list-dialog/emp-list-dialog.component';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { EmpListDialogComponent } from 'src/app/@modules/hrms/employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';

@Component({
  selector: 'app-action-audit',
  templateUrl: './action-audit.component.html',
  styleUrls: ['./action-audit.component.scss']
})
export class ActionAuditComponent {
  assignAction: any;
  constructor(private route: Router,
    public dialog: MatDialog,
    private employService: EmpRegistrationService,
    private toster: ToastrService,
    private _rbackService: RbacMasterService,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }
  public cellValue: any;
  reloadCurrentRoute() {
    // window.location.reload();
    let currentUrl = this.route.url;
    console.log(currentUrl,"currentUrl");
    if (!this.cellValue.map) {
      let dd = currentUrl.split('?')
      let em: any = dd[1].split('=')
      console.log(currentUrl, 'currnet');
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate([dd[0]], { queryParams: { employee_id: em[1] } });
      });
    } else {
      let dd = currentUrl.split('?')
      let em: any = dd[1].split('=')
      console.log(currentUrl, 'currnet');
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate([dd[0]], { queryParams: { employee_id: em[1], map: this.cellValue.map } });
      })
    }
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);

  }
  getValueToDisplay(params: ICellRendererParams) {

    return params.valueFormatted ? params.valueFormatted : params.data;
    // return params.valueFormatted ? params.valueFormatted : params.data.auditorMapping_id;

  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e: any) {
    console.log(this.cellValue, "cellValue");


    e.stopPropagation();
    // 
    this.route.navigate(['master/audit/audit-management/add-auditor/add-auditor-create'],
      {
        queryParams: {
          employee_id: this.cellValue.employee_id, map: this.cellValue.auditorMapping_id
        }
      })

  }

  delete(e: any) {
    e.stopPropagation();

    Swal.fire({
      title: 'Are you sure to delete this Employee ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        // const data = {
        //   status: "INACTIVE"
        // }
        this.employService.deleteAuditor(this.cellValue.auditorMapping_id).subscribe(
          (res: any) => {

            this.toster.success('Deleted Successfully')
            this.reloadCurrentRoute();
          }, (err) => {

            this.toster.error('Something went wrong please try again', 'Error Message')
            this.reloadCurrentRoute();

          }
        )
      };
    });
  }
  openDialog() {
    const dialogRef
      = this.dialog.open(EmpListDialogComponent, {
        width: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        panelClass: 'full-screen-modal',
        data: { id: this.cellValue }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
