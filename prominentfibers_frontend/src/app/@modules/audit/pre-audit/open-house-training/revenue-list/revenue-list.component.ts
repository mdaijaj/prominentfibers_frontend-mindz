import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RevenueCreateComponent } from '../revenue-create/revenue-create.component';
import { AsssumptionCreateComponent } from '../asssumption-create/asssumption-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-revenue-list',
  templateUrl: './revenue-list.component.html',
  styleUrls: ['./revenue-list.component.scss']
})
export class RevenueListComponent implements OnInit{
  revenue_Data: any;
  open_house_training_id: any;
  training_id: any;
  Program_Estimate_id: any;
  constructor(public dialog: MatDialog, private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private leadService: LeadService, private route: Router){

  }
 ngOnInit(): void {
  this.activeroute.queryParams.subscribe(params => {
    this.open_house_training_id = params;  
    this.training_id = this.open_house_training_id?.open_house_training_id;
      this.leadService.getById_Program_Estimate(this.training_id).subscribe((res: any) => {
      this.Program_Estimate_id = res?.data?.Program_Estimate_id;
      this.revenue_Data = res?.data;
      })      
    })
 }
 openDialog() {
  const dialogRef = this.dialog.open(RevenueCreateComponent,{
    width: '45%',
    data: this.training_id
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result?.type_of_bill=="pre_program"){
    const data={
      open_house_training_id: Number(this.training_id),
      Trainer_Cost: Number(result?.Trainer_Cost),
      travel_Cost: Number(result?.travel_Cost),
      trainer_Stay_Charges: Number(result?.trainer_Stay_Charges),
      trainer_Local_Travel: Number(result?.trainer_Local_Travel),
      BDE_Local_Travel: Number(result?.BDE_Local_Travel),
      hall_Charges: Number(result?.hall_Charges),
      projector_Charges: Number(result?.projector_Charges),
      participant_Kit: Number(result?.participant_Kit),
      total_Cost: Number(result?.participant_Kit),
      type_of_bill: result?.type_of_bill,
    }   

     this.leadService.createRevenue(data).subscribe((res: any) => {
      this.Program_Estimate_id = res?.data?.Program_Estimate_id;   
      this.toast.success('Pre Program Estimate Created Successfully..'); 
      this.leadService.getById_Program_Estimate(this.training_id).subscribe((res: any) => {
        this.revenue_Data = res?.data;
       })
     });
   }
   else if(result?.type_of_bill=="actual_bill")
    {
      this.leadService.updateRevenue(result,this.Program_Estimate_id).subscribe((res: any) => {
      this.toast.success('Actual Revenue Created Successfully..');
       this.leadService.getById_Program_Estimate(this.training_id).subscribe((res: any) => {
        this.revenue_Data = res?.data;             
       })
    });
    }  
    else if(result?.type_of_bill=="overshot"){
      
      this.leadService.updateOvershot(result, this.Program_Estimate_id).subscribe((res: any) => {
        this.revenue_Data = res?.data;
        this.toast.success('Overshot Revenue Created Successfully..');   
        this.leadService.getById_Program_Estimate(this.training_id).subscribe((res: any) => {
          this.revenue_Data = res?.data;
         })  
       });
      }
  });
}
open_assumption_dialog() {
  const dialogRef_Assumption = this.dialog.open(AsssumptionCreateComponent,{
    width: '45%'
  });

  dialogRef_Assumption.afterClosed().subscribe(assumption_result => {
     if(this.Program_Estimate_id !=null || undefined){
      this.leadService.updateAssumption(assumption_result,this.Program_Estimate_id).subscribe((res: any) => {
        this.toast.success('Assumptions Remarks Created Successfully..');
         this.leadService.getById_Program_Estimate(this.open_house_training_id?.open_house_training_id).subscribe((res: any) => {
          this.revenue_Data = res?.data;             
         })
      });
    }    
  });
}
reloadCurrentRoute() {
  let currentUrl = this.route.url;
  this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.route.navigate([currentUrl]);
  });
}
}
