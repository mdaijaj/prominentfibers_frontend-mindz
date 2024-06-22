import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-itr-action',
  templateUrl: './itr-action.component.html',
  styleUrls: ['./itr-action.component.scss']
})
export class ItrActionComponent {
  cellValue: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService) {}
  ngOnInit(): void {
    
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.id;
  }

}
