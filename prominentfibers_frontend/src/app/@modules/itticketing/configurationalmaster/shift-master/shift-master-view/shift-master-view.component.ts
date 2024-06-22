import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-shift-master-view',
  templateUrl: './shift-master-view.component.html',
  styleUrls: ['./shift-master-view.component.scss']
})
export class ShiftMasterViewComponent {
  shiftForm: any;
  shiftMasterForm: any;
  shiftId: any;
  parm: any;
  getData: any;
  propertyManager: any;
  firstLastName: any;
  personalIdData: any;
  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  extraWords: boolean = false;



  constructor(private fb: FormBuilder,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private emp_master: EmpMasterService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private locatin: Location,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private location: Location
  ) {
    // shiftMasterForm
    this.shiftMasterForm = this.fb.group({
      shift_name: new FormControl(null,),
      shift_from_time: new FormControl(null,),
      shift_to_time: new FormControl(null,),
      working_hour: new FormControl(null,),
      description: new FormControl(null,),
    })
  }

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: any) => {
      this.parm = params;
      this.shiftId = params.id;

    })
    if (this.shiftId) {
      this.getByIdUse();
    }

    this._empRegistration.grtEmployeeList().subscribe((res: any) => {

      this.personalIdData = res.data;
      this.propertyManager = Array.from(this.personalIdData, (a: any) => `${a.first_name} ${a.last_name}`)

    })

    this._empRegistration.getByUserId(localStorage.getItem('EmpMainId')).subscribe((res: any) => {

      this.getData = res.data.first_name;
      this.shiftMasterForm.controls['requester'].setValue(this.getData);
    })
  }

  goBack() {
    this.location.back();
  }

  wordCounter() {
    //alert(this.text.nativeElement.value)
    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;
  }

  changedText() {
    if (this.words >= 50) {
      this.extraWords = true;
      this.toast.warning('Please enter within the text limit..', 'Warning Message');
      return
    } else if (this.words < 50) {
      this.extraWords = false;
    }
  }

  back() {
    history.back()
  }

  getByIdUse() {
    this._configurationalMasterService.getByIdShift(this.shiftId).subscribe((res: any) => {
      this.getData = res.data;
      this.basicFormPatch(this.getData)
    })
  }

  basicFormPatch(getData: any) {

    this.shiftMasterForm.patchValue({
      shift_name: getData?.shift_name,
      shift_from_time: getData?.shift_from_time,
      shift_to_time: getData?.shift_to_time,
      working_hour: getData?.working_hour,
      description: getData?.description,
    })
  }
}
