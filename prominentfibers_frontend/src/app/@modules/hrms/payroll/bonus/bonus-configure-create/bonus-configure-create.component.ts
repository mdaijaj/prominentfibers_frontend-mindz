import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';


@Component({
  selector: 'app-bonus-configure-create',
  templateUrl: './bonus-configure-create.component.html',
  styleUrls: ['./bonus-configure-create.component.scss']
})
export class BonusConfigureCreateComponent {
  BonusConfigForm: FormGroup;
  bonusConfigData: any;
  singleBonusConfigData: any;
  id: any;
  bonus_id: any;
  constructor(private router: Router, private fb: FormBuilder,public dialog: MatDialog,
    private hrServies: HrServiceService, private toast: ToastrService,
    private activeroute: ActivatedRoute) {
    this.BonusConfigForm = this.fb.group({
      bonus_name: new FormControl(null, [Validators.required]),
      bonus_series: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      from_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null,[Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })

  }

  ngOnInit(){
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.bonus_id = params.id;
      
    });

    if (this.bonus_id) {
      this.hrServies.bonusConfigGetById(this.bonus_id).subscribe((res: any) => {
        this.singleBonusConfigData = res.data;
        
        this.BonusConfigForm.patchValue({
          bonus_name: this.singleBonusConfigData.bonus_name,
          bonus_series: this.singleBonusConfigData.bonus_series,
          amount: this.singleBonusConfigData.amount,
          from_date: this.singleBonusConfigData.from_date,
          end_date: this.singleBonusConfigData.end_date,
          description: this.singleBonusConfigData.description,
        });
      })
    } else {
      
    }
  }

  goBackBonusConfigList(path:any){
    this.router.navigate([path])
  }

  onSubmit(){
    let data = this.BonusConfigForm.value;
   if(!this.BonusConfigForm.invalid){
    this.hrServies.addBonusConfig(data).subscribe((res:any)=>{
      this.bonusConfigData = res.data;
      this.toast.success(res.message)
      this.router.navigate(['master/hrms/payroll/bonus/bonus-configure']);

    })
    
   } else{
    this.toast.error('Please fill all fields')
   }
  }

  onCancel() {
   this.router.navigate(['master/hrms/payroll/bonus/bonus-configure'])
  }

  onUpdate(){
      let data = this.BonusConfigForm.value;
      this.hrServies.updateBonusConfig(this.bonus_id, data).subscribe(
        (res: any) => {
          
          this.toast.success(res.message);
          this.router.navigate(['master/hrms/payroll/bonus/bonus-configure']);
        },
        (err) => {
          if (err.status == 400) {
            this.toast.error('Something went Wrong');
          } else {
            this.toast.error('Error in submission!');
          }
        }
      );
    
  
  }
}
