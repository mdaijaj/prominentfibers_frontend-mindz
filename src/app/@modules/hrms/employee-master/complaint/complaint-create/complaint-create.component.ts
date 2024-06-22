import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-create.component.html',
  styleUrls: ['./complaint-create.component.scss'],
  providers: [DatePipe],
})
export class ComplaintCreateComponent {
  createComplaint: FormGroup;
  complaintId: any;
  id: any;
  mainId:any;
  allComplaint: any;
  reportingManager: any;
  employeId: any;
  getData: any;
  parm: any;
  firstLastName: any;
  propertyManager: any = [];
  personalIdData: any;
  nameAchieve: any;
   reportingManagerList:any = []
  constructor(
    private emp_master: EmpMasterService,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private route: Router,
    private activeroute: ActivatedRoute,
    private location: Location
  ) {
    this.createComplaint = this.fb.group({
      complaint_from: new FormControl(null),
      complaint_name: new FormControl(null, Validators.required),
      complaint_against: new FormControl(null, Validators.required),
      reporting_manager: new FormControl(null, Validators.required),
      complaint_date: new FormControl(null, Validators.required),
      complaint_description: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required),
      record_added_by: new FormControl(null, Validators.required),
      record_added_on: new FormControl(null, Validators.required),
    });
  }
  ngOnInit() {
    this.mainId = localStorage.getItem('EmpMainId');
    
    this.getAchievementList();
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
      
      this.complaintId = this.id.complaintId;
      
    });
   

    this._empRegistration.grtEmployeeList().subscribe((res: any) => {
      this.personalIdData = res.data;
      this.propertyManager = Array.from(
        this.personalIdData,
        (a: any) => `${a.title} ${a.first_name} ${a.last_name}`
      );
      this.firstLastName = Array.from(
        this.personalIdData,
        (a: any) => `${a.first_name} ${a.last_name}`
      );
      
    });
    this.getAllManagerList()
    this.getByIdUse();
    //getting first field from user name
    this._empRegistration.getByUserId(localStorage.getItem('EmpMainId'))
      .subscribe((res: any) => {
        this.nameAchieve = res.data.first_name;
        this.createComplaint.patchValue({
          complaint_from: this.nameAchieve
        })

      });
  }
  goBack() {
    this.location.back();
  }
  getAllManagerList(){
    this._empRegistration.getAllManagersList().subscribe((res: any) => {
    this.reportingManagerList  = Array.from( res.data, (a: any) => `${a.first_name} ${a.last_name}`);
  })
}


  getByIdUse() {
    this.emp_master.complaintAddById(this.complaintId).subscribe((res: any) => {
      this.getData = res.data;
      
      this.basicFormPatch(this.getData);
    });
  }

  basicFormPatch(getData: any) {
    this.createComplaint.patchValue({
      complaint_from: getData?.complaint_from,
      complaint_name: getData?.complaint_name,
      complaint_against: getData?.complaint_against,
      reporting_manager: getData?.reporting_manager,
      complaint_date: getData?.complaint_date,
      complaint_description: getData?.complaint_description,
      notes: getData?.notes,
      record_added_by: getData?.record_added_by,
      record_added_on: getData?.record_added_on,
    });
    
  }
  getAchievementList() {
    this.recruitService.getAllAchivement().subscribe(
      (res: any) => {
        this.allComplaint = res.data;
        
      },
      (err) => {
        
      }
    );
  }

  onSubmitForm() {
    let val = this.createComplaint.value;
    
    const data = {
      complaint_from: val.complaint_from,
      complaint_name: val.complaint_name,
      complaint_against: val.complaint_against,
      reporting_manager: val.reporting_manager,
      complaint_date: moment(val.complaint_date).format('YYYY-MM-DD'),
      complaint_description: val.complaint_description,
      notes: val.notes,
      record_added_by: val.record_added_by,
      record_added_on: moment(val.record_added_on).format('YYYY-MM-DD'),
    };
    this.recruitService.createComplaint(data).subscribe(
      (res: any) => {
        
        this.toast.success(res.message);
        this.router.navigate(['master/hrms/employee-master/complaint-list']);
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else {
          this.toast.error('Error in submission!');
        }
      }
    );
  }
  updateForm(e: any) {
    e.stopPropagation();
    this.emp_master
      .complaintUpdateById(this.complaintId, this.createComplaint.value)
      .subscribe((res: any) => {
        this.toast.success('Complaint Details Updated successfully..');
        this.route.navigate(['master/hrms/employee-master/complaint-list']);
      });
  }
  onUpdateForm() {
    let val = this.createComplaint.value;
    
    const data = {
      achieved_by: val.complaint_from,
      complaint_name: val.complaint_name,
      complaint_against: val.complaint_against,
      reporting_manager: val.reporting_manager,
      complaint_date: val.complaint_date,
      recognized_by: val.recognized_by,
      complaint_description: val.complaint_description,
      badges: val.badges,
      course_employee: val.course_employee,
      status: 'Active',
      recognized_date: val.updatedAt,
      achieve_date: val.achieve_date,
    };
  }

  reLoad() {
    // window.location.reload();
    history.back();
  }
}
