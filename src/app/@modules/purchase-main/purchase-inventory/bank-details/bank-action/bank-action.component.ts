import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bank-action',
  templateUrl: './bank-action.component.html',
  styleUrls: ['./bank-action.component.scss']
})
export class BankActionComponent {
  cellValue: any;
  bankData: any;
  constructor(private route: Router, 
    private vendorService: VendorManagementService,
    private toast: ToastrService,

    ) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.bank_details_id;
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
      title: 'Are you sure to delete this Bank Detail ?',
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
        this.vendorService.deleteBank(this.cellValue).subscribe((res:any)=>{
          
            this.toast.success(res.message)
            this.reloadCurrentRoute();

        }, (err) => {
            
            this.toast.error('Something went wrong please try again', 'Error Message')
          }
        )
      };
    });
  
  }
}
