import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-add-type-dilog',
  templateUrl: './add-type-dilog.component.html',
  styleUrls: ['./add-type-dilog.component.scss']
})
export class AddTypeDilogComponent implements OnInit{
  componentType_id: any;
  singleAddTypeData: any;
  localTime:any;
  constructor(public dialog: MatDialogRef<AddTypeDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.componentType_id = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.componentType_id) {
      this.hrService.addTypeGetById(this.componentType_id).subscribe((res: any) => {
        this.singleAddTypeData = res.data;
        
      })
    } else {
      
    }

  }
}
