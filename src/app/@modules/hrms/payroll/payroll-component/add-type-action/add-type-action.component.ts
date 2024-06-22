import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { AddTypeDilogComponent } from '../add-type-dilog/add-type-dilog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type-action',
  templateUrl: './add-type-action.component.html',
  styleUrls: ['./add-type-action.component.scss']
})
export class AddTypeActionComponent implements OnInit {
  cellValue: any;
  constructor(private route: Router, 
    private hrServies: HrServiceService,
    private toast: ToastrService,
    public dialog: MatDialog) {}
  ngOnInit(): void { 
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.component_type_id;
  }
  
  edit(e: any) {
    e.stopPropagation();
    
    
    this.route.navigate(['master/hrms/payroll/Payroll-component/add-create'],
      { queryParams: { componentType_id: this.cellValue} })
      
    // this.hrServies.setAddTypeId(Number(this.cellValue))
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }
  open_dialog(e:any){
   e.stopPropagation();
   
   Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: "#f44336",
    confirmButtonColor: "#3f51b5",
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
const dialogRef
        = this.dialog.open(AddTypeDilogComponent, {
          width: '60%',
          maxWidth: '45vw',
          maxHeight: '80vh',
          
          // height: '100%',
          panelClass: 'full-screen-modal',
          data: { id: this.cellValue }
        });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }})
      // const dialogRef
      //   = this.dialog.open(AddTypeDilogComponent, {
      //     width: '60%',
      //     maxWidth: '45vw',
      //     maxHeight: '80vh',
          
      //     // height: '100%',
      //     panelClass: 'full-screen-modal',
      //     data: { id: this.cellValue }
      //   });
      // dialogRef.afterClosed().subscribe(result => {
        
      // });
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  delete(e:any){
    e.stopPropagation();
      Swal.fire({
        title: 'Are you sure to delete component?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: "#f44336",
        confirmButtonColor: "#3f51b5",
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
    this.hrServies.deleteComponent(this.cellValue).subscribe((res:any)=>{
    this.reloadCurrentRoute();
    this.toast.success("Delete Successfully..")
      
    })
        }})

      }
          // this._lmsUserManagementService.sendCourseRequest(course.traning_id, data).subscribe(
          //   (res) => {
          //     
          //     this.toster.success('Request Rejected successfully')
          //     this.reloadCurrentRoute();
          //   }, (err) => {
          //     this.toster.error('Something went wrong please try again', 'Error Message');
          //   })

    //   });
    // }

 
  formulaAdd(){

  }
}


  
  

  
  

