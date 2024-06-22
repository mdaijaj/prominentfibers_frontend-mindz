import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorManagementService } from '../@shared/services/vendor-management.service';

@Component({
  selector: 'app-send-link-vendor',
  templateUrl: './send-link-vendor.component.html',
  styleUrls: ['./send-link-vendor.component.scss']
})
export class SendLinkVendorComponent {
  title: string;
  edited_ID: any;
  id: any;
  vendor_id: any;
  urll: string;
  urll2: string;
  data: string;
  active: boolean;

  constructor( private route: Router,
    private vendorService: VendorManagementService,
    private activeroute: ActivatedRoute,
    ) {}

  ngOnInit(): void {

    this.vendorService.getVendorId().subscribe(
      (res: any) => {
        
        this.edited_ID = res
      })

    this.vendorService.getVendorTitle().subscribe(
      (res: any) => {
        this.title = res
      })

      this.activeroute.queryParams.subscribe((params: any) => {
        this.id = params;
        this.vendor_id = params.id;
        
      });
    if (this.vendor_id) {
      this.active = true;
    }
    if (!this.vendor_id) {
      this.urll = this.route.url;
      this.urll2 = this.route.url.toString();
      this.data = (this.urll2.slice(45, 60)).toUpperCase()
    } else {
      this.urll = this.route.url;
      this.urll2 = this.route.url.toString();
      this.data = (this.urll2.slice(45, 58)).toUpperCase()
    }
    
  }

  url(elite: any) {
    this.data = elite
    
  }


  goToBasicDetails(title: string) {
    this.title = title
    this.vendor_id? this.route.navigate(['master/vendor/vendor-management/vendor-list/create-vendor/basic-details'], { queryParams: { id: this.edited_ID } }) :null
  };

  goToBankDetails(title: string) {
    this.title = title
    this.vendor_id? this.route.navigate(['master/vendor/vendor-management/vendor-list/create-vendor/bank-details'], { queryParams: { id: this.edited_ID } }):null
  };

  goToDocumentDetails(title: string) {
    this.title = title
    this.vendor_id? this.route.navigate(['master/vendor/vendor-management/vendor-list/create-vendor/documents'], { queryParams: { id: this.edited_ID } }):null
  };
}
