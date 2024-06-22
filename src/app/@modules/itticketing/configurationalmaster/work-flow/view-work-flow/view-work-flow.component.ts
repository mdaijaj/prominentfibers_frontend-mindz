import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-view-work-flow',
  templateUrl: './view-work-flow.component.html',
  styleUrls: ['./view-work-flow.component.scss']
})
export class ViewWorkFlowComponent implements OnInit {

constructor(
  private dialog: MatDialogRef<ViewWorkFlowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _configurationalmasterService: ConfigurationalmasterService,
){}
getRecordById:any
getAllEmployeeDetails:any=[]
ngOnInit(): void {
  console.log(this.data.id,'id');
  this._configurationalmasterService.viewWorkflowById(this.data.id).subscribe((response:any)=>{
    console.log(response,'response');
    this.getRecordById=response.data[0];
    this.getAllEmployeeDetails=response.data.employeedetails;
  })
}




}
