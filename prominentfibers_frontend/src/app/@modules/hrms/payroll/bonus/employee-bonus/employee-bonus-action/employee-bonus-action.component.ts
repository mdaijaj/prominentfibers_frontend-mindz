import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-bonus-action',
  templateUrl: './employee-bonus-action.component.html',
  styleUrls: ['./employee-bonus-action.component.scss']
})
export class EmployeeBonusActionComponent implements OnInit {
  cellValue: any;
  constructor(private router: Router,
    private hrService: HrServiceService,
    private toast: ToastrService,) { }

  ngOnInit(): void {

  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.Bonus_id;
  }


  edit(e: any) {

    e.stopPropagation();
    

    this.router.navigate(['/master/hrms/payroll/bonus/employee-bonus-create'],
      { queryParams: { id: this.cellValue } })
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  delete(e: any) {
    e.stopPropagation();

    Swal.fire({
      title: `File will be deleted parmanently.`,
      text: 'Are you sure to delete this file?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Skip'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.hrService.deleteBonus(this.cellValue).subscribe((res: any) => {
          this.reloadCurrentRoute();
          this.toast.success("Delete Successfully..")

        },
        (err) => {
          if (err.status == 400) {
            this.toast.error('Something went Wrong');
          } else {
            this.toast.error('Error in submission!');
          }
        }
        )

      }
      else{
      
      }
    })

  }
}

