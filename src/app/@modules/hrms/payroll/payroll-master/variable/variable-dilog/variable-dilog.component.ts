import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-variable-dilog',
  templateUrl: './variable-dilog.component.html',
  styleUrls: ['./variable-dilog.component.scss']
})
export class VariableDilogComponent {
  cellValue: any;
  itr_id: any;
  getItrData: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private toast: ToastrService, public dialog: MatDialogRef<VariableDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.itr_id = this.data.id;
      
    }
  ngOnInit(): void {
    this.hrServies.getitrVar(this.itr_id).subscribe((res:any)=>{
      this.getItrData = res.data;
    })
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.id;
  }
}
