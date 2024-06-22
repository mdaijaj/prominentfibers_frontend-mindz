import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-bonus-config-dilog',
  templateUrl: './bonus-config-dilog.component.html',
  styleUrls: ['./bonus-config-dilog.component.scss']
})
export class BonusConfigDilogComponent {
  bonusConfig_id: any;
  singleHolidayData: any;
  constructor(private hrService: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute,public dialog: MatDialogRef<BonusConfigDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      this.bonusConfig_id = this.data.id;
    
    }
  ngOnInit(): void {

    if (this.bonusConfig_id) {
     this.hrService.bonusConfigGetById(this.bonusConfig_id).subscribe((res: any) => {
       this.singleHolidayData = res.data;
     })
   } else {
     
   }

 }
}
