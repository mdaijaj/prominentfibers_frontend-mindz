import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';

@Component({
  selector: 'app-emp-bonus-dilog',
  templateUrl: './emp-bonus-dilog.component.html',
  styleUrls: ['./emp-bonus-dilog.component.scss']
})
export class EmpBonusDilogComponent {
  singleHolidayData: any;
  empBonus_id: any;
  singleEmpBonusData: any;
  singleEmpBonusEmp: any;
  constructor(private hrService: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute,public dialog: MatDialogRef<EmpBonusDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      this.empBonus_id = this.data.id;
    
    }
  ngOnInit(): void {

    if (this.empBonus_id) {
     this.hrService.empBonusGetById(this.empBonus_id).subscribe((res: any) => {
      
      
       this.singleEmpBonusData = res.data
       this.singleEmpBonusEmp = res.data.add_multiplr_user

       
       
       ;
     })
   } else {
     
   }

 }
}

