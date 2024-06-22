import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
// import { EmpListDialogComponent } from '../emp-list-dialog/emp-list-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
// import { ProductMasterDialogComponent } from '../product-master-dialog/product-master-dialog.component';

@Component({
  selector: 'app-bay-action',
  templateUrl: './bay-action.component.html',
  styleUrls: ['./bay-action.component.scss']
})
export class BayActionComponent {
  assignAction:any;
  params:any;
  singleData:any;
  constructor(private route: Router,
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private _rbackService:RbacMasterService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
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
    this.params = params;
    this.singleData = params.data;
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.data.id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e: any) {
    e.stopPropagation();
    this.params.onActionPerform(this.singleData)
  }

  delete(e: any) {
    
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure want to Remove?',
      // text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Delete!',
      cancelButtonText: 'Skip'
    }).then((result) => {
      if (result.value) {
        
        this._configurationalMasterService.deleteProductMaster(this.cellValue).subscribe(res => {
          window.location.reload();
        })
        // Swal.fire(
        //   'Deleted!',
        //   'Your imaginary file has been deleted.',
        //   'success'
        // )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }
  openDialog() {
    // const dialogRef = this.dialog.open(ProductMasterDialogComponent, {
    //   data: { id: this.cellValue }
    // });
    // dialogRef.afterClosed().subscribe(result => {
      
    // });
  }

}

