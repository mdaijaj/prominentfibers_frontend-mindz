import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-pf-dilog',
  templateUrl: './pf-dilog.component.html',
  styleUrls: ['./pf-dilog.component.scss']
})
export class PfDilogComponent implements OnInit{
  pfesi_id: any;
  singlePfData: any;
  localTime:any;
  constructor(public dialog: MatDialogRef<PfDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hrService: HrServiceService) {
    this.pfesi_id = this.data.id;
    
  }

  ngOnInit(): void {

     if (this.pfesi_id) {
      this.hrService.getPfById(this.pfesi_id).subscribe((res: any) => {
        this.singlePfData = res.data;
        
      })
    } else {
      
    }

  }
}
