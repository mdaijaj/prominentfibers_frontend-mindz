import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-view-config-dilog',
  templateUrl: './view-config-dilog.component.html',
  styleUrls: ['./view-config-dilog.component.scss']
})
export class ViewConfigDilogComponent {
  config_id: any;
  singleAddData: any;
  localTime:any;
  constructor(public dialog: MatDialogRef<ViewConfigDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.config_id = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.config_id) {
      this.hrService.configGetById(this.config_id).subscribe((res: any) => {
        this.singleAddData = res.data;
        
      })
    } else {
      
    }

  }
}
