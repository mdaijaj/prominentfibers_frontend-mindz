import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-opportunity-exist-action',
  templateUrl: './opportunity-exist-action.component.html',
  styleUrls: ['./opportunity-exist-action.component.scss']
})
export class OpportunityExistActionComponent {
  cellValue: any;
  checkBox: any;
  idDocument: number;
  isChecked: boolean;

  constructor(
    private elementRef: ElementRef, private renderer: Renderer2,
    private route: Router,
    public dialog: MatDialog,
    private router: Router,
    private _configurationalmasterService: ConfigurationalmasterService,
    private toaster: ToastrService,
  ) {
    // this.data = localStorage.getItem("jobId");
    // 

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
    
    this.checkBox = params.data.isChecked;
    this.idDocument=Number(params.data.employee_id);
    console.log(this.idDocument,'this.idDocument');
    
    if (this.checkBox === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    return params.valueFormatted ? params.valueFormatted : params.data.product_master_id
  }
  refresh(params: ICellRendererParams): boolean {
    
    // wrirte code to modify cell 
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  
  validate(e: any) {
    e.stopPropagation();
    this.route.navigate(
      ['master/lead/lead-management/validate-lead/validate-lead'],
      { queryParams: { lead_id: this.cellValue, type: 'validate' } }
    );
  }
}
