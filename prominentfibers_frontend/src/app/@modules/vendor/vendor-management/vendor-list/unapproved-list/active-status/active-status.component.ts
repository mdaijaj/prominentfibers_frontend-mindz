import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-active-status',
  templateUrl: './active-status.component.html',
  styleUrls: ['./active-status.component.scss']
})
export class ActiveStatusComponent {
  cellValue: any;
  constructor(private route: Router,
    private vendorService: VendorManagementService,
    private toast: ToastrService) {}
  ngOnInit(): void {
    
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
    return params.valueFormatted ? params.valueFormatted : params.data.vendor_management_id;
  }

  activeTogle(e:any){
    e.stopPropagation();
    
    
    setTimeout(() =>{
      this.statusUpdate()
    }, 500);
   
  }

  statusUpdate(){
    let data = {
      "vendor_status": "ACTIVE",
      "is_active": true
  }
    this.vendorService.updateStatus(this.cellValue,data).subscribe((res:any) =>{
      
      if(res){
        this.toast.success(res.message);
        this.reloadCurrentRoute();
      }

    })
  }

}
