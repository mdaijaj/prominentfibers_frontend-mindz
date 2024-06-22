import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { EmpListDialogComponent } from '../../../employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';

@Component({
  selector: 'app-dms-dialog',
  templateUrl: './dms-dialog.component.html',
  styleUrls: ['./dms-dialog.component.scss']
})
export class DMSDialogComponent {
  rowData: any;
  empId:any
  singleEmpData:any;
  reportingManager:any;
  title:any;
  lastName:any;
  constructor(
    // private _dmsService: EmpRegistrationService,
    private _dmsService:DMSService,
    public dialog: MatDialogRef<DMSDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
     {
      this.empId = this.data.id
      
  }

  ngOnInit(): void {
    if(this.empId){
      this._dmsService.AddById(this.empId).subscribe((res: any) => {
        this.singleEmpData = res.data;
        
        this.title = JSON.parse(res.data.document_master_id);
        // this.title = JSON.parse(res.data.reporting_manager).title;
        // this.lastName =  JSON.parse(res.data.reporting_manager).first_name;
        // this.reportingManager = JSON.parse(res.data.reporting_manager).reporting_manager;
      })
    }else{ 
      
    }
  }

}
