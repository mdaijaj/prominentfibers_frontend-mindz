import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})


export class ActionComponent implements OnInit {
  cellValue: any;
  assignAction:any;
  constructor(private route: Router, private hrServies: HrServiceService,private _rbackService:RbacMasterService,
    private toster: ToastrService) {}
  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }

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
    
    return params.valueFormatted ? params.valueFormatted : params.data.holiday_id;
  }

  holidayDelete (e: any) {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure to delete this Holiday Detail ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        
        
        // const data = {
        //   "status": "INACTIVE"
        // }
        this.hrServies.deleteSingleHoliday(this.cellValue).subscribe(
          (res: any) => {
            
            this.toster.success(res.message)
            this.reloadCurrentRoute();
          }, (err) => {
            
            this.toster.success('Something went wrong please try again', 'Error Message')
          }
        )
      };
    });
  }

  edit(e: any) {
    e.stopPropagation();
    this.route.navigate(['master/hrms/leave-master/holiday-create'],
      { queryParams: { holiday_id: this.cellValue} })
  }
}
