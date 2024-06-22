import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pf-action',
  templateUrl: './pf-action.component.html',
  styleUrls: ['./pf-action.component.scss']
})
export class PfActionComponent implements OnInit {
  cellValue: any;
  constructor(private toster: ToastrService, private route: Router,
    private hrServies: HrServiceService,) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.pfesi_id;
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  pfDelete (e: any) {
      e.stopPropagation();
      Swal.fire({
        title: 'Are you sure to delete this PF Details ?',
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
            "status": "INACTIVE"
          }
          this.hrServies.deleteSinglePf(this.cellValue, data).subscribe(
            (res: any) => {
              
              this.toster.success('Deleted Successfully')
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
      this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/pf-create'],
        { queryParams: { pfesi_id: this.cellValue} })
    }

}
