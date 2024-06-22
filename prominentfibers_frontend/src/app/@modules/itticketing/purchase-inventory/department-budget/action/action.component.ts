import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import {ToastrService } from 'ngx-toastr';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import Swal from 'sweetalert2';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { TrainingViewComponent } from 'src/app/@modules/purchase-main/purchase-inventory/department-budget/training-view/training-view.component';
import { RescheduleViewComponent } from 'src/app/@modules/purchase-main/purchase-inventory/department-budget/reschedule-view/reschedule-view.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit , AfterViewInit {
  params: ICellRendererParams<any, any>;
  getFormData: any;
  assignAction: any;

  constructor(private route: Router,
    private _lmsService: LmsServiceService,
    private router: Router,
    public dialog: MatDialog,
    private toast: ToastrService,
    private recruitService: RecruitService,
    private _rbackService: RbacMasterService,
  ) {
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.params = params;

  }
  getValueToDisplay(params: ICellRendererParams) {
  
    return params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e: any) {
    e.stopPropagation();
    
    this.route.navigate(['master/lms/lms-home/Schedule-traing/schedule-training-list/schedule-create'],
      { queryParams: { traning_id: this.cellValue } }
    )
    this._lmsService.categoryList().subscribe(
      (res: any) => {
        this.getFormData = res;
        
      })

  }
  viewAssignUser(e:any){

  }

  // delete(e: any) {
  //   e.stopPropagation();
  //   if (this.status_dataGet == "OPEN" || this.status_dataGet == "RESCHEDULED") {
      
  //     Swal.fire({
  //       title: `Date ${this.scheduled_dateGet} training will be cancelled`,
  //       text: 'Are you sure to cancelled training?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       cancelButtonColor: "#8B817D",
  //       confirmButtonColor: "#f44336",
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No, Skip'
  //     }).then((result: any) => {
  //       if (result.isConfirmed) {
  //         const data = {
  //           status: "CANCELED"
  //         }
  //         this.training_id = Number(this.cellValue)
          
          


  //         this._lmsService.trainingDeleteById(this.training_id, data).subscribe((res: any) => {
            
  //           this.reloadCurrentRoute();
  //           this.toast.success("Training cancelled successfully ..........");
  //           // this.router.navigate(['master/hrms/DMS/dataManagement/docLibrary']);
  //           // window.location.reload();
  //         })
  //       }

  //     })

  //   }
  //   else {

  //     this.toast.warning("Training has been completed, can't cancelled");

  //   }


  // }


  // traininDone(e: any) {
  //   this.getNowDate();
    
    

  //   e.stopPropagation();
  //   if (this.status_dataGet == "OPEN" || this.status_dataGet == "RESCHEDULED") {
      
  //     Swal.fire({
  //       title: `Training Date:- ${this.scheduled_dateGet}`,
  //       text: 'Are you sure training has been completed?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       cancelButtonColor: "#8B817D",
  //       confirmButtonColor: "#f44336",
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No, Skip'
  //     }).then((result: any) => {
  //       if (result.isConfirmed) {
  //         const data = {
  //           status: "COMPLETED"
  //         }
  //         this.training_id = Number(this.cellValue)
          
          


  //         this._lmsService.complete_training(this.training_id, data).subscribe((res: any) => {
            
  //           this.reloadCurrentRoute();
  //           this.toast.success("Training complete successfully ..........");
  
  //         })
  //       }
  //     })

  //   }

  //   // }
  //   else {
  //     e.stopPropagation();
  //     this.toast.warning("without training, Can't done");
  //   }
  // }
  openDialog_Reschedule() {
    const dialogRef
      = this.dialog.open(RescheduleViewComponent, {

        data: { reschedule_id: this.cellValue }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }



  openDialog() {
    const dialogRef
      = this.dialog.open(TrainingViewComponent, {
 
        data: { id: this.cellValue }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  fixed_budget(e: any) {
    console.log(this.cellValue,"cell value");
    
    e.stopPropagation();
    this.route.navigate(['master/itticket/purchase-inventory/create-budget'],
      { queryParams: { dept_name: this.cellValue.department_name, dept_id: this.cellValue.dept_id} }
    )
  }
  
}
