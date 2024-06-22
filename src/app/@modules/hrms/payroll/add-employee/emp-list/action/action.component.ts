import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmpListDialogComponent } from 'src/app/@modules/hrms/employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  constructor(private route: Router,
    public dialog: MatDialog,
    private employService: EmpRegistrationService,
    private toster: ToastrService
  ) {
  }

  ngOnInit(): void {
  }
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.employee_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  addEmp(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/hrms/payroll/add-employee/add-emp/emp-basice-detail'],
      { queryParams: { employee_id: this.cellValue } })
    this.employService.setEmpId(Number(this.cellValue))
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
