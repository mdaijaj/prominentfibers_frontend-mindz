import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QualityManagementService } from '../../quality-management-service/quality-management.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-update-quality-check',
  templateUrl: './update-quality-check.component.html',
  styleUrls: ['./update-quality-check.component.scss']
})
export class UpdateQualityCheckComponent implements OnInit {
  qualityCheck:FormGroup
  isBatchChecked=true

constructor(private location:Location,private _fb:FormBuilder,
  private _active:ActivatedRoute,
  private _qualityService:QualityManagementService,
  private toaster:ToastrService,
  private _route:Router
  ){
this.qualityCheck= _fb.group({
  product_name:new FormControl(''),
  product_variant:new FormControl(''),
  shift_id:new FormControl('',Validators.required),
  date:new FormControl('',Validators.required),
  batchNo:new FormControl(''),
  generate_label:new FormControl(''),
  total_production:new FormControl(''),
  quality_pass:new FormControl('',Validators.required),
  NG:new FormControl('',Validators.required),
})

}
shiftList:any[]=[]
variant_id:any;
 
variant_name:any;
total_qty:any
quality_id:any
ngOnInit(): void {
  this._active.queryParams.subscribe((res:any)=>{
    this.quality_id=res.Quality_CheckID;
    console.log(res.Quality_CheckID,'id');
    this._qualityService.getQualityCheckById(res.Quality_CheckID).subscribe((res:any)=>{
      console.log(res,'response');
      this.total_qty=res.data.plantList.total_qty;
      this.shiftList=res.data.plantList.shiftList
      this.variant_id=res.data.plantList.product_variant;
       this.qualityCheck.patchValue({
        product_name:res.data.plantList.product_master.product_name,
        product_variant:res.data.plantList.product_master.product_variant_masters[0].variant_name, 
        batchNo:res.data.batch_number
       })
    })
  }) 
}
goBack()
{
  this.location.back()
}

sum:any
total_prodution_val:any;
calculateSum() {
  this.total_prodution_val=+this.qualityCheck.get('total_production')?.value || 0
  const qualityPassValue =this.qualityCheck.get('quality_pass')?.value || 0
  const ngValue = this.qualityCheck.get('NG')?.value || 0;
  this.sum = qualityPassValue + ngValue;   
}
 
updateQualityCheck(data:any){
  let Qualitydata={
    total_production:+data.total_production,
    shift_id:data.shift_id,
    quality_passed:data.quality_pass,
    ng:data.NG,
    date:moment(data.date).format('MM/DD/YYYY'),
    generate_label:data.generate_label==true?'batch':'Sno'
  } 
if(this.qualityCheck.invalid){
  this.toaster.error('Mendatory field should not be empty','Error Message')
  return
}
else if(this.total_prodution_val!=this.sum){
  this.toaster.error('Total Production should be equal Sum of Quality Pass and NG','Error Message')
   return
}
else{
  this._qualityService.updateQualityCheck(this.quality_id,Qualitydata).subscribe((res:any)=>{
    if(res){
      this.toaster.success(res.message)
      this._route.navigate(['/master/quality-management/quality-check'])
    }
  },(err:any)=>{
    this.toaster.error(err.error.message)
  })
}




}

}
