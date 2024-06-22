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
  selector: 'app-asssumption-create',
  templateUrl: './asssumption-create.component.html',
  styleUrls: ['./asssumption-create.component.scss'],
})
export class AsssumptionCreateComponent implements OnInit {
  revenueCreate: FormGroup;
  id: any;
  open_house_training_id: any;
  Program_Estimate_id: any;
  constructor(
    private dialogRef: MatDialogRef<AsssumptionCreateComponent>,
    private fb: FormBuilder,
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private leadService: LeadService,
    private route: Router
  ) {
    this.revenueCreate = this.fb.group({
      trainer_fees: new FormControl(null),
      price_kit: new FormControl(null),
      hall_charges: new FormControl(null, Validators.required),
      projector_cost: new FormControl(null, Validators.required),
      trainer_stay: new FormControl(null, Validators.required),
      additional_people: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      this.open_house_training_id = this.id?.open_house_training_id;
      this.leadService
        .getById_Program_Estimate(this.open_house_training_id)
        .subscribe((res: any) => {
          this.Program_Estimate_id = res?.data?.Program_Estimate_id;         
        });
    });
  }
  submitForm() {
    const val = this.revenueCreate.value;
    const data = {
      AssTrainer_Fee: Number(val?.trainer_fees),
      AssProjector_Cost: Number(val?.projector_cost), 
      AssTrainerStay: Number(val?.trainer_stay),
      AssPrice_Kit: Number(val?.price_kit),
      AssAdditional_Hallcharges: Number(val?.hall_charges),
      AssHall_charges: Number(val?.additional_people)      
    };
    this.dialogRef.close(data);
  }
}
