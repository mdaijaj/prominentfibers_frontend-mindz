import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { CrmService } from 'src/app/@shared/services/crm/crm.service';
import { ProductionService } from 'src/app/@shared/services/production/production.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-bom-status',
  templateUrl: './bom-status.component.html',
  styleUrls: ['./bom-status.component.scss']
})
export class BomStatusComponent {
  assignAction: any;
  singleData: any = {};
  isChecked = false;
  checkBox: any;

  constructor(private route: Router,
    public dialog: MatDialog,
    private productService:ProductionService,
    private toster: ToastrService,
    private $crm: CrmService,
    private _rbackService: RbacMasterService,
  ) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
  }
  public cellValue: any;
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    this.singleData = params?.data.id;
     console.log(this.singleData,'this.singleData') 
  }
  status_id:any
  getValueToDisplay(params: ICellRendererParams) {
    this.checkBox = params.data.status;
this.status_id=params.data.id
    console.log(this.checkBox,'this.checkBox');
    
    if (this.checkBox === "ACTIVE") {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    return params.valueFormatted
      ? params.valueFormatted
      : params.data.id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again

    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  // Form update start
  toggle(e: any, isChecked: boolean) {
    console.log(this.cellValue,'this.cellValue');
    try {
      e.stopPropagation();
      let status;
      if (isChecked) status = "ACTIVE";
      else status = "INACTIVE";
      let body = {
        status: status,
      } 
      this.productService.changeStatusById(this.cellValue, body).subscribe((response: any) => {
        if (response) {
          this.toster.success(response.message);
          this.reloadCurrentRoute()
        }
      }, err => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
}
