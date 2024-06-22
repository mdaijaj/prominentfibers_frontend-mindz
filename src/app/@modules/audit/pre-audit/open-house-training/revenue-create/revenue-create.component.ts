import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-revenue-create',
  templateUrl: './revenue-create.component.html',
  styleUrls: ['./revenue-create.component.scss'],
})
export class RevenueCreateComponent implements OnInit {
  revenueCreate: FormGroup;
  hide_other: boolean = false;
  hide_actual: boolean = false;
  id: any;
  open_house_revenue_generate_id: any;
  Program_Estimate_id: any;
  revenue_Data: any;
  revenue_type: any;
  hidepre_program: boolean;
  ActualBillData: {};
  actualData: any;
  open_house_training_id: any;
  Actual_id: any;
  OvershotData: {};
  type_of_bill: any;
  constructor(
    private dialogRef: MatDialogRef<RevenueCreateComponent>,
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private leadService: LeadService,
    private route: Router,   
  ) {
    this.revenueCreate = this.fb.group({
      Trainer_Cost: new FormControl(null),
      travel_Cost: new FormControl(null),
      trainer_Stay_Charges: new FormControl(null, Validators.required),
      trainer_Local_Travel: new FormControl(null, Validators.required),
      BDE_Local_Travel: new FormControl(null, Validators.required),
      hall_Charges: new FormControl(null, Validators.required),
      projector_Charges: new FormControl(null, Validators.required),
      participant_Kit: new FormControl(null, Validators.required),
      total_Cost: new FormControl(null, Validators.required),
    });
  }
  ngOnInit() {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
        this.open_house_training_id = this.id?.open_house_training_id;
        this.leadService
        .getById_Program_Estimate(this.open_house_training_id)
        .subscribe((res: any) => {
          this.Program_Estimate_id = res?.data?.Program_Estimate_id;   
          this.Actual_id = res?.data?.ABTrainer_Cost;          
          if (this.Program_Estimate_id != null || undefined) {
            this.hide_other = true;
            this.hidepre_program = true;
            }
          if((res?.data?.ABTrainer_Cost !=null ||undefined)&&(this.Program_Estimate_id != null || undefined))
          {
            this.hide_actual = true;
           }
        });
    });
  }
  submitForm() {
    const val = this.revenueCreate.value;
        
    if(this.revenue_type =="actual_bill")
    { 
      this.ActualBillData = {
        ABTrainer_Cost: Number(val.Trainer_Cost),
        ABtravel_Cost: Number(val.travel_Cost),
        ABtrainer_Stay_Charges: Number(val.trainer_Stay_Charges),
        ABtrainer_Local_Travel: Number(val.trainer_Local_Travel),
        ABBDE_Local_Travel: Number(val.BDE_Local_Travel),
        ABhall_Charges: Number(val.hall_Charges), 
        ABprojector_Charges: Number(val.projector_Charges),
        ABparticipant_Kit: Number(val.participant_Kit),
        ABtotal_Cost: Number(val.participant_Kit), 
        type_of_bill: this.revenue_type       
       }       
       this.dialogRef.close(this.ActualBillData);

    } else if(this.Program_Estimate_id==null||undefined) 
    { 
      const data = {
        open_house_training_id: Number(this.open_house_revenue_generate_id),
        Trainer_Cost: Number(val.Trainer_Cost),
        travel_Cost: Number(val.travel_Cost),
        trainer_Stay_Charges: Number(val.trainer_Stay_Charges),
        trainer_Local_Travel: Number(val.trainer_Local_Travel),
        BDE_Local_Travel: Number(val.BDE_Local_Travel),
        hall_Charges: Number(val.hall_Charges),
        projector_Charges: Number(val.projector_Charges),
        participant_Kit: Number(val.participant_Kit),
        total_Cost: Number(val.participant_Kit),
        type_of_bill: this.revenue_type,
      };
      this.dialogRef.close(data);
    } else if(this.revenue_type == "overshot") 
    { 
      this.OvershotData ={
        SOTrainer_Cost: Number(val.Trainer_Cost),
        SOtravel_Cost: Number(val.travel_Cost),
        SOtrainer_Stay_Charges: Number(val.trainer_Stay_Charges),
        SOtrainer_Local_Travel: Number(val.trainer_Local_Travel),
        SOBDE_Local_Travel:  Number(val.BDE_Local_Travel),
        SOhall_Charges: Number(val.hall_Charges), 
        SOprojector_Charges: Number(val.projector_Charges),
        SOparticipant_Kit:  Number(val.participant_Kit),
        SOtotal_Cost:  Number(val.participant_Kit),
        type_of_bill: this.revenue_type,  

      }
      this.dialogRef.close(this.OvershotData);  
    }
   
  }

  dd_value(event: any) {
    this.revenue_type = event.value;   
    if (this.revenue_type == 'pre_program') {
      this.hide_other = false;
    }
  }
}
