import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  cellValue: any;
  toast: any;
  constructor(private router:Router,
    private hrService:HrServiceService) {}

  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    console.log("params", params)
    return params.valueFormatted ? params.valueFormatted : params.data.advance_payment_id;
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  delete(e: any) {
    console.log(this.cellValue);
    
    e.stopPropagation();

    Swal.fire({
      title: `Record will be deleted parmanently.`,
      text: 'Are you sure to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, Skip'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.hrService.deleteAdvancePayment(this.cellValue).subscribe((res: any) => {
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

  
  edit(e: any) {
    
    e.stopPropagation();
    this.router.navigate(['master/hrms/payroll/advance-payment/advance_payment_create'],
    { queryParams: { id: this.cellValue } }
    )

  }
}