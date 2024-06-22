import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.component.html',
  styleUrls: ['./training-view.component.scss']
})
export class TrainingViewComponent implements OnInit {
  rowData: any;
  empId:any
  singleData:any
  constructor(private _lmsService:LmsServiceService,public dialog: MatDialogRef<TrainingViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
     {
      
      
      this.empId = this.data.id
      
  }

  ngOnInit(): void {

  this.getSingleRowDataByID();
    
  }

  getSingleRowDataByID(){
    this._lmsService.scheduleTrainingSingleDataByID(this.empId).subscribe((res:any)=>{
 this.singleData=res.data[0]
 

    })
    

  }
}
