import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
// import { Location } from '@angular/common';
@Component({
  selector: 'app-help-desk-create',
  templateUrl: './help-desk-create.component.html',
  styleUrls: ['./help-desk-create.component.scss']
})
export class HelpDeskCreateComponent implements OnInit {
  helpDiskForm: any;
  employeId: any;
  parm: any;
  getData: any;
  propertyManager:any;
  firstLastName:any;
  personalIdData:any;
  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;
  extraWords: boolean = false;

  asignData: any;
  asignvariables: any;
  asignvariable: any;
  uniqueId: any;
  uniquedata: any;
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private emp_master: EmpMasterService,
    private toast: ToastrService,
    private locatin: Location,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private location: Location
  ) {

    this.helpDiskForm = this.fb.group({
      requester: new FormControl(null ,[Validators.required]),
      subject: new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(150)]),
      assignee: new FormControl(null,[Validators.required]),
      field_title: new FormControl(null,[Validators.required]),
      request_for: new FormControl(null,[Validators.required]),
      priority: new FormControl(null,[Validators.required]),
      // type_of_document: new FormControl(null,[Validators.required]),
      request_no: new FormControl(null,[Validators.required]),
      status1: new FormControl(null,[Validators.required]),
      description: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params:any) => {
      this.parm = params;
      this.employeId = params.id;
      
    })
    this.getAssginSingle()
    if(this.employeId){
      this.getByIdUse();
      this.getByUniqueNumber()

    }
    this.AutoGenerateRequestNo()
    
    this._empRegistration.grtEmployeeList().subscribe((res: any) => {
      
      this.personalIdData = res.data;
      this.propertyManager = Array.from(this.personalIdData, (a: any) => `${a.first_name} ${a.last_name}`)
      
    })

    this._empRegistration.getByUserId(localStorage.getItem('EmpMainId')).subscribe((res: any) => {
      
      this.getData = res.data.first_name;
      this.helpDiskForm.controls['requester'].setValue(this.getData);
    })

    if(!this.employeId){
      this.getuniqueNumber();

    }
  }

  goBack() {
    this.location.back();
  }
  getAssginSingle() {
    this.recruitService.getSpocRecruipment().subscribe((res: any) => {
      this.asignData = res.data;
      this.asignvariables =  this.asignData.map((res: any) => res.first_name)
      this.asignvariable = this.asignData
      
    });
  }
  
  asignFilter(e: any) {
    const aa = e
    let filteredVariable = this.asignvariable.filter((item: any) => aa.includes(item.first_name));
    this.asignData = filteredVariable
    console.log(this.asignData, "checkkkk")

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
    } else if (this.words < 50)  {
      this.extraWords = false;
    }
  }
  
  back(){
    history.back()
  }

  getByIdUse() {
    this.emp_master.helpDeskGetById(this.employeId).subscribe((res: any) => {
      this.getData = res.data;
      // console.log(this.asignData);
   
      
      // console.log(this.getData);
      // this.getAssginSingle()
      this.basicFormPatch(this.getData)


    })
  }
  
  AutoGenerateRequestNo(){
    this.emp_master.AutoGenerateRequestNo().subscribe((response: any) => {
      console.log(response);
      
      const apiRequestNo = response.data;
      // this.helpDiskForm.patchValue({
      //   request_no: apiRequestNo
      // });
      // this.helpDiskForm.controls['request_no'].disable();
    },
    (error) => {
      // Handle error
    }
    )
  }

  getByUniqueNumber(){
    this.emp_master.getByUniqueNumber(this.employeId).subscribe((res:any)=>{
      console.log(res,'res');
      this.uniqueId=res?.data;
      this.helpDiskForm.patchValue({
          request_no:  this.uniqueId
        });
        this.helpDiskForm.controls['request_no'].disable();
       })
  }
  
  basicFormPatch(getData: any) {

    this.helpDiskForm.patchValue({
      requester: Number(getData?.requester),
      subject: getData?.subject,
      assignee: getData?.assignee,
      field_title: getData?.field_title,
      request_for: getData?.request_for,
      priority: getData?.priority,
      type_of_document: getData?.type_of_document,
      request_no: getData?.request_no || this.uniqueId ,
      status1: getData?.status1,
      description: getData?.description,
    })
  }

  updateForm(e: any) {
    e.stopPropagation();
      this.emp_master.updateHelpDesk(this.employeId, this.helpDiskForm.value).subscribe((res: any) => {
      this.toast.success("Help Desk Details Updated successfully", "Updated successfully")
      this.router.navigate(['master/hrms/employee-master/help-disk']);
      
      
    },(err)=>{
      
      this.toast.error("Something went wron please try again", "Error Massage");
    }

    )
  }

  onSubmitForm() {
    let val = this.helpDiskForm.value;
    if(this.helpDiskForm.invalid) {
      this.toast.error('required fields should not be blank', 'Required fields');
      return
    }
    this.emp_master.helpDeskCreate(val).subscribe((res: any) => {
      
      this.toast.success("help desk created successfully", "Created Successfully");
      this.router.navigate(['master/hrms/employee-master/help-disk']);
    }, (err) => {
      
      if(err.error.code === 403){
        this.toast.error(`${err.error.message}`, "Error Massage");
      }else{
        this.toast.error("Something went wron please try again", "Error Massage");
      }
    }
    )
  }

  getuniqueNumber(){
    this.emp_master.getUniqueNumber().subscribe((res:any)=>{
      console.log(res,'res');
      this.uniquedata=res.data;
      
      this.helpDiskForm.patchValue({
          request_no: this.uniquedata
        });
        this.helpDiskForm.controls['request_no'].disable();
    })
  }



}
