import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-add-auditor-create',
  templateUrl: './add-auditor-create.component.html',
  styleUrls: ['./add-auditor-create.component.scss']
})
export class AddAuditorCreateComponent {
  postOpeningForm: any;
  jobDescriptionForm: any;
  PostDetailsForm: any;
  jobDescriptionCreate: any;
  jobDescriptionDetailsForm: any
  jobTypeData: any;
  jobTitleData: any;
  getIdTitle: any;
  TitleId: any;
  idJobTitle: any;
  empId: any;
  eacodeData: any;
  accreditionData: any;
  statndardData: any;
  getData: any;
  map_id: any;
  button: string = "Save";
  getAllData: any;
  // idJob: void;
  constructor(private fb: FormBuilder, private _empRegistration: EmpRegistrationService,
    private _configurationalMasterService: ConfigurationalmasterService, private _leadService: LeadService, private activeroute: ActivatedRoute, private _recruitmentService: RecruitService, private toast: ToastrService, private route: Router) {
    this.jobDescriptionDetailsForm = this.fb.group({
      standard_audit: new FormControl(null),
      accredition_audit: new FormControl(null),
      sector_audit: new FormControl(null),
      nomination_since: new FormControl(null),
      valid_until_audit: new FormControl(null),
      first_name: new FormControl(null),
      last_name: new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      console.log(params, "params");
      this.empId = params.employee_id;
      this.map_id = params.map;
      //map_id
      this._leadService.auditor_maping(Number(this.empId)).subscribe((res: any) => {
        // 
        this.getAllData = res.data;
      })
      console.log(this.map_id, 'empId');
      this._leadService.get_by_idAuditor(this.map_id).subscribe((res: any) => {
        if (this.map_id) {
          this.button = "Update"

        }
        console.log(res.data, "res data");
        this.jobDescriptionDetailsForm.patchValue({
          standard_audit: res.data.standard_audit,
          accredition_audit: res.data.accredition_audit,
          sector_audit: res.data.sector_audit,
          nomination_since: res.data.nomination_since,
          valid_until_audit: res.data.valid_until_audit,
        })
      })


      this._empRegistration.getByUserId(this.empId).subscribe((res: any) => {
        this.getData = res.data;
        console.log(this.getData, 'getData');

        this.jobDescriptionDetailsForm.patchValue({
          first_name: this.getData.first_name,
          last_name: this.getData.last_name
        })

        // this.basicFormPatch(this.getData, this.propertyManager);
      });
    })







    this.getJobType();
    // this.getJobTitle();
    // this.titleID()
    let department: any = document.getElementById('department');
    let candidate_age: any = document.getElementById('candidate_age');

    // department.setAttribute('readonly',true);
    // candidate_age.setAttribute('readonly',true);
    this.getEacode();
    this.getAccrediationlogo();
    this.getallspa();
  }

  scroll(el: HTMLElement) {
    if (this.jobDescriptionDetailsForm.invalid) {
      this.toast.error(" All Fields is Required")
      return
    }

    this.toast.success("Job Description Details Created")
    el.scrollIntoView();
  }

  scrollTwo(el: HTMLElement) {
    // this.jobDescriptionSubmit();
    el.scrollIntoView();
  }

  // reloadCurrentRouteWithNewEmployeeId(newEmployeeId: number) {
  //   // Get the current URL tree
  //   const currentUrlTree = this.route.parseUrl(this.route.url);

  //   // Update the query parameter
  //   currentUrlTree.queryParams = { employee_id: newEmployeeId };

  //   // Navigate to the updated URL
  //   this.route.navigateByUrl(currentUrlTree);
  //   console.log(this.route.navigateByUrl(currentUrlTree),"this.route")
  // }


  auditorSubmit() {
    if (!this.map_id) {
      let val = this.jobDescriptionDetailsForm.value;
      let auditData = {
        employee_id: this.empId,
        auditor_name: val.first_name,
        standard_audit: val.standard_audit,
        accredition_audit: val.accredition_audit,
        sector_audit: val.sector_audit,
        nomination_since: moment(val.nomination_since).format('YYYY-MM-DD'),
        valid_until_audit: moment(val.valid_until_audit).format('YYYY-MM-DD')
      }
      console.log(auditData, 'auditData');
      this._leadService.updateAddAuditor(auditData).subscribe((res: any) => {
        this.jobDescriptionCreate = res;
        console.log(this.jobDescriptionCreate, 'this.jobDescriptionCreate');
        this.toast.success("Add Audit Update Successfully")
        this.reloadCurrentRouteWithParams();
      },
        (err: any) => {
          this.toast.error("Somthing Wents Wrong");
        }
      )
    }
    else {
      let val = this.jobDescriptionDetailsForm.value;
      let auditData = {
        employee_id: this.empId,
        auditor_name: val.first_name,
        standard_audit: val.standard_audit,
        accredition_audit: val.accredition_audit,
        sector_audit: val.sector_audit,
        nomination_since: moment(val.nomination_since).format('YYYY-MM-DD'),
        valid_until_audit: moment(val.valid_until_audit).format('YYYY-MM-DD')
      }
      console.log(auditData, 'auditData');
      this._leadService.update_auditorbyid(this.map_id, auditData).subscribe((res: any) => {
        this.jobDescriptionCreate = res;
        console.log(this.jobDescriptionCreate, 'this.jobDescriptionCreate');
        this.toast.success("Update Audit Successfully")
        this.reloadCurrentRouteWithParams();
      },
        (err: any) => {
          this.toast.error("Somthing Wents Wrong");
        }
      )


    }

  }

  reloadCurrentRouteWithParams() {
    console.log("kjlkjlkjlkh");
    window.location.reload();
  }


  getJobType() {
    this._recruitmentService.getJobTypeVaccancy().subscribe((res: any) => {
      this.jobTypeData = res.data;

    })
  }
  getEacode() {
    this._configurationalMasterService.getEacode().subscribe((res: any) => {
      this.eacodeData = res.data;
      console.log(this.eacodeData, 'this.eacodeData');


    })
  }
  getAccrediationlogo() {
    this._configurationalMasterService.getAccrediationlogo().subscribe((res: any) => {
      this.accreditionData = res.data;
      console.log(this.accreditionData, 'this.accreditionData ');
    })
  }

  getallspa() {
    this._configurationalMasterService.allProductList().subscribe((params: any) => {
      this.statndardData = params.data
    },
    (err:any)=>[
      this.toast.error("")
    ]);
  }

  getCurrentRoute(): string {
    return this.activeroute.snapshot.url.map(s => s.path).join('/')
  }
}
