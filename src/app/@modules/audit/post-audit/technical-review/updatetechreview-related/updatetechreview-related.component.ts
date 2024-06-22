import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-updatetechreview-related',
  templateUrl: './updatetechreview-related.component.html',
  styleUrls: ['./updatetechreview-related.component.scss']
})
export class UpdatetechreviewRelatedComponent implements OnInit{
// postAuditForm: any;
  // reject:any;
  check:any;
  rejectionForm: FormGroup;
  @Input() postAuditForm : FormGroup;
  @Input() reject : any;
  @Output() reject1 = new EventEmitter<any>();
  check_status: any;
  completeData: any;
  techreviewData: any;
  payload: any;

 constructor(private fb: FormBuilder,private _configurationalMasterService: ConfigurationalmasterService,
  private route: Router, private activetRoute: ActivatedRoute,
    private toaster: ToastrService, private router: Router){
  this.rejectionForm = this.fb.group({
    tTenOne: new FormControl(null),
    tFirstOne: new FormControl(null),
    tFirstTwo: new FormControl(null),
    tFirstThree: new FormControl(null),
    tFirstFour: new FormControl(null),
    tFirstFive: new FormControl(null),
    tFirstSix: new FormControl(null),
    tFirstSeven: new FormControl(null),
    tFirstEight: new FormControl(null),
    tFirstNine: new FormControl(null),
    tSecondOne: new FormControl(null),
    tSecondTwo: new FormControl(null),
    tSecondThree: new FormControl(null),
    tSecondFive: new FormControl(null),
    tFinalOne: new FormControl(null),
    tFinalTwo: new FormControl(null),
  })
 }
 ngOnInit():void{
  this.getTechreview();
 }
 statusChangereview(e:any){
  this.reject = e.value;
  this.reject1.emit(this.reject);
 }
 checkBox(e:any){
  this.check = e.source.value;
  this.check_status=e.checked
 }
 getTechreview() {
  this._configurationalMasterService.getAlltechreview().subscribe((res: any) => {
    this.techreviewData = res.data;
    
  })
}

checktOne(technical_review_id:any, data:any) {
  data.code_status=technical_review_id.checked;
  this.updatetechreview(technical_review_id,data);
  
  
 }
updatetechreview(id: any, data: any) {
  this._configurationalMasterService.updatetechreview(id, data).subscribe(
    (res: any) => {
      
      this.toaster.success('Technical Review Updated Successfully');
    },
    (err: any) => {
      this.toaster.error(
        "discription is All Ready Exits!",
        'Error Message'
      );
      
    }
  );
}
checkTechnicalFirst(e: any, value: any){
  this.reject1.emit(this.checkk());
  let obj:any = {}
obj[value]= e.checked
 }
 checkTechnicalSecond(e:any){
  this.reject1.emit(this.checkkk());
 }
 checkTechnicalFinal(e:any){
  this.reject1.emit(this.checkkkk());
 }
checkk() {
  let val = this.rejectionForm.value;
    this.payload={
    approved_report: val.tFirstOne,
    rework_clarification_required: val.tFirstTwo,
    rejected: val.tFirstThree,
    certification_decision:val.tFirstFour,
    further_review_required: val.tFirstFive,
    comments: val.tFirstSix,
    reviewe: val.tFirstSeven,
    for_standard: val.tFirstEight,
    justification: val.cFirstSeven,
    next_steps: val.tFirstEight,
    date: val.tFirstNine
  }
  this._configurationalMasterService.createcontechreview(this.payload).subscribe(
    (res: any) => {
      this.toaster.success('1st Technical Review Created Successfully');
    },
    (err: any) => {
      this.toaster.error(
        "discription is All Ready Exits!",
        'Error Message'
      );
      
    }
  );
}
checkkk() {
  let val = this.rejectionForm.value;
    this.payload={
    approved_report: val.tFirstOne,
    rework_clarification_required: val.tFirstTwo,
    rejected: val.tFirstThree,
    certification_decision:val.tFirstFour,
    further_review_required: val.tFirstFive,
    comments: val.tFirstSix,
    reviewe: val.tFirstSeven,
    for_standard: val.tFirstEight,
    justification: val.cFirstSeven,
    next_steps: val.tFirstEight,
    date: val.tFirstNine
  }
  this._configurationalMasterService.createcontechreview(this.payload).subscribe(
    (res: any) => {
      this.toaster.success('2nd Technical Review Created Successfully');
    },
    (err: any) => {
      this.toaster.error(
        "discription is All Ready Exits!",
        'Error Message'
      );
      
    }
  );
}
checkkkk() {
  let val = this.rejectionForm.value;
    this.payload={
    approved_report: val.tFirstOne,
    rework_clarification_required: val.tFirstTwo,
    rejected: val.tFirstThree,
    certification_decision:val.tFirstFour,
    further_review_required: val.tFirstFive,
    comments: val.tFirstSix,
    reviewe: val.tFirstSeven,
    for_standard: val.tFirstEight,
    justification: val.cFirstSeven,
    next_steps: val.tFirstEight,
    date: val.tFirstNine
  }
  this._configurationalMasterService.createcontechreview(this.payload).subscribe(
    (res: any) => {
      this.toaster.success('Final Technical Review Created Successfully');
    },
    (err: any) => {
      this.toaster.error(
        "discription is All Ready Exits!",
        'Error Message'
      );
      
    }
  );
}
 
}
