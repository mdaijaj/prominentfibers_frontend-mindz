import { Component } from '@angular/core';
import { Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-esi-dilog',
  templateUrl: './esi-dilog.component.html',
  styleUrls: ['./esi-dilog.component.scss']
})
export class EsiDilogComponent {
  pfesi_id: any;
  singlePfData: any;
  localTime:any;
  constructor(public dialog: MatDialogRef<EsiDilogComponent>,
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
