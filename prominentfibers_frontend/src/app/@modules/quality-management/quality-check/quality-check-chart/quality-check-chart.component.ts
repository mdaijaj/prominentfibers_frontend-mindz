import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'; 
import { QualityManagementService } from '../../quality-management-service/quality-management.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-quality-check-chart',
  templateUrl: './quality-check-chart.component.html',
  styleUrls: ['./quality-check-chart.component.scss']
})
export class QualityCheckChartComponent implements OnInit {
  QualityChartform:FormGroup


  @ViewChild('pieChart') private pieChartRef: any;

  public pieChart:any;
constructor(private _location:Location ,private _qualityCheckService:QualityManagementService,
  private _activeRoute:ActivatedRoute,private _fb:FormBuilder
  ){
this.QualityChartform=_fb.group({
  product_name:new FormControl(''),
  product_variant:new FormControl(''),
  total_qty:new FormControl(''),
  qualityPass:new FormControl(''),
  NG:new FormControl(''),
  shift_id:new FormControl(''),
})


  }
productVariant:any;
getAllShift:any[]=[]
ngOnInit(): void {
 this._activeRoute.queryParams.subscribe((res:any)=>{
     if(res.qualityChart){
      this._qualityCheckService.getQualityChartData(res.qualityChart).subscribe((res:any)=>{
           const product_id=+res.data.plantList.product_variant 
           this.getAllShift=res.data.plantList.shiftList
            console.warn(this.getAllShift,'this.getAllShift');
            
          
           this.productVariant=  res.data.plantList.product_master.product_variant_masters.filter((res:any)=>{
          if(res.id==product_id)
           return res;
        })
        this.QualityChartform.patchValue({
          product_name:res.data.plantList.product_master.product_name,
          product_variant:this.productVariant[0].variant_name,
          total_qty:res.data.plantList.total_qty,
          qualityPass:res.data.quality_passed,
          NG:res.data.ng
        })
      })
     }
 })
  

}

ngAfterViewInit() {
  
  this.createPieChart()
}


createPieChart(){
  const ctx = this.pieChartRef.nativeElement.getContext('2d');
  this.pieChart = new Chart(ctx, {
    type: 'line',
    data: {

      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September'
      ],
      datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40,30,10],
         label:'Total Production',
        fill: false,
        borderColor: 'rgb(229, 241, 210)',
        tension: 0.1
      },
      {
        data: [65, 9, 8, 1, 6, 5, 4,3,1],
        label:'Morning Shift', 
        fill: false,
        borderColor: 'rgb(118, 202, 236)',
        tension: 0.1
      },
      {
        data: [3, 5, 8, 9, 7, 5, 6,3,5],
        label:'Evening Shift', 
         
        fill: false,
        borderColor: 'rgb(253, 224, 167)',
        tension: 0.1
      },
      {
        data: [10, 20, 30, 40, 50, 60, 30,10,20],
        label:'Night Shift', 
         
        fill: false,
        borderColor: 'rgb(185, 185, 185)',
        tension: 0.1
      }
    ]
    
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'category',
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

goBack(){
  this._location.back()
}

}
