import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-add-dilog',
  templateUrl: './add-dilog.component.html',
  styleUrls: ['./add-dilog.component.scss']
})
export class AddDilogComponent implements OnInit{
  component_id: any;
  singleAddData: any;
  localTime:any;
  constructor(public dialog: MatDialogRef<AddDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.component_id = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.component_id) {
      this.hrService.addGetById(this.component_id).subscribe((res: any) => {
        this.singleAddData = res.data;
        
      })
    } else {
      
    }

  }
}
