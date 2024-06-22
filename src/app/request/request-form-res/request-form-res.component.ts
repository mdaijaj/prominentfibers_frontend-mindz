import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-request-form-res',
  templateUrl: './request-form-res.component.html',
  styleUrls: ['./request-form-res.component.scss'],
})
export class RequestFormResComponent implements OnInit {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId:any;
  candidateId: any;
  id: any;
  categoryList: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  val: any;
  public searchResult: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  submitted: boolean;
  constructor(
    private fb: FormBuilder,  private toast: ToastrService,
    private route: Router, private activeroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.lead_id;
      
      // this.leadService.getByIdLead(this.lead_id).subscribe((res:any) => {
      //   this.singleLeadData = res.data;
      //   
      //   this.patchFormvalue();
      // })
    });
    this.mainId = localStorage.getItem("EmpMainId");
      
      if (this.mainId != undefined) {
        // this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
        //   this.mainEmployeeData = res.data;
        //   
        //   this.getAchievementList();
        //   this.patchFormvalue();
        // })
      }
  }

  get f() {
    return this.leadForm.controls;
  }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series:any) {
      
      return series.first_name.toLowerCase().startsWith(value)
    })
    
  }

  
  candidateClick(e:any){
    
    this.candidateId = e;
    // this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
    //   this.interviewGetId=res.data;
    //   
    //   this.patchFormvalue();
    // })
  }


  customerType() {
    this.cutomerType = true;
  }
  siteAudit() {
    this.sitAudit = true;
  }

  siteAuditNew() {
    this.sitAudit = false;
  }

  customerTypeNew() {
    this.cutomerType = false;
  }
 
}
