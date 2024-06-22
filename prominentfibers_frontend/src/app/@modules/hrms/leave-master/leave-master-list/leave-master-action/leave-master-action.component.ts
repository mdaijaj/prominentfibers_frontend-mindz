import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-master-action',
  templateUrl: './leave-master-action.component.html',
  styleUrls: ['./leave-master-action.component.scss']
})
export class LeaveMasterActionComponent implements OnInit{
  cellValue: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toster: ToastrService) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.leavePolicyId;
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  leaveDelete (e: any) {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure to delete this Leave Detail ?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#f44336",
      confirmButtonColor: "#3f51b5",
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        
        
        const data = {
          "leaveStatus": "INACTIVE",
          "leavePolicyId": this.cellValue
        }
        this.hrServies.leaveDelete(this.cellValue,data).subscribe(
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
    this.route.navigate(['/master/hrms/leave-master/leave-master-create'],
      { queryParams: { leavePolicyId: this.cellValue} })
  }
}
