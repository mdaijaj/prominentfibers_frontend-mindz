import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-bay-row-text-field',
  templateUrl: './bay-row-text-field.component.html',
  styleUrls: ['./bay-row-text-field.component.scss']
})
export class BayRowTextFieldComponent {


    assignAction:any;
  params: any;
  disabled : boolean;
  textValue : any;
  singleData: any;
      
    constructor(private route: Router,
      public dialog: MatDialog,
      private _configurationalMasterService: ConfigurationalmasterService,
      private toast: ToastrService,
      private _rbackService:RbacMasterService,
      private location: Location,
      private activeRoute: ActivatedRoute,
    ) {
      this.activeRoute.queryParamMap.subscribe((param: any) => {
        if (param && param.params && param.params.rowInputData) {
          console.log(JSON.parse(param.params.rowInputData))
        }
      })
    }
  
    ngOnInit(): void {
      this.assignAction = this._rbackService.accessAssignAction();
      this.disabled = false;
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
      this.singleData = params.data;
      this.params = params;
      console.log("sinfle data s ",this.singleData)
    }
    getValueToDisplay(params: ICellRendererParams) {
      return params.valueFormatted ? params.valueFormatted : params.data.block_name;
    }
    getValueToDisplay2(params: ICellRendererParams) {
      return params.valueFormatted ? params.valueFormatted : params.data.no_of_bays;
    }
  
    refresh(params: ICellRendererParams): boolean {
      // set value into cell again
      
      this.cellValue = this.getValueToDisplay(params);
      return true;
    }
  
    edit(e: any) {
      e.stopPropagation();
  
      // this.route.navigate(['master/itticket/configurational-master/product-master/create'], { queryParams: { id: this.cellValue } })
      this.route.navigate(["master/warehouse-management/block-create"],{ queryParams: { block_name: this.cellValue } });
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

    onTextChange(event:any) {
      this.params.onActionPerform(this.singleData)
    }

    // dummy(params: ICellRendererParams): boolean {
    //   // set value into cell again
      
    //   this.params.
    //   return true;
    // }

    openDialog() {
      // const dialogRef = this.dialog.open(ProductMasterDialogComponent, {
      //   data: { id: this.cellValue }
      // });
      // dialogRef.afterClosed().subscribe(result => {
        
      // });
    }
}


