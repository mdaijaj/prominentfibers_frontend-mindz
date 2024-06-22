import { Component, Inject } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,ValidatorFn,AbstractControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';


function noLeadingSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  };
}


@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss']
})
export class DepartmentDialogComponent {
  departmentForm: FormGroup;
  id: any;
  mainId: any;
  submitted: boolean | undefined;
  loginUser: any;
  loginUserID: any;
  departmentData: any;
  departmentId: any;
  view: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private route: Router,
    private activeroute: ActivatedRoute,
    public dialog: MatDialogRef<DepartmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departmentForm = this.fb.group({
      department_name: new FormControl(null, [Validators.required,noLeadingSpaces()]),
    });
  }
  ngOnInit() {
    this.departmentId = this.data.id
    this.view = this.data.view
    this.mainId = localStorage.getItem('EmpMainId');
    this.activeroute.queryParams.subscribe((params) => {
      this.id = params;
    });
    let a:any = localStorage.getItem('signInUser');
    this.loginUser = JSON.parse(a)
    this.loginUserID = this.loginUser.employee_id;
    console.log(this.loginUserID,'loginn');
    if(this.departmentId){
      this._configurationalMasterService.departmentById(this.departmentId).subscribe((res: any) => {
        this.departmentData = res.data;
          this.departmentForm.patchValue({
            department_name: this.departmentData?.department_name,
          })
      });
    }
  }

  onSubmitForm() {
    Object.keys(this.departmentForm.controls).forEach(key => {
      this.departmentForm.controls[key].markAsTouched();
    });
    this.submitted = false;
    if (this.departmentForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.departmentForm.value;
    const data = {
      department_name: val.department_name,
    };
    this._configurationalMasterService.createDepartment(data).subscribe(
      (res: any) => {
        if(res.message === "Department Name is Already Exits!"){
        this.toast.warning('Department Name is Already Exits!');
      }
      else{
        this.toast.success('Department Added Successfully');
        this.route.navigate([
          'master/itticket/configurational-master/department',
        ]);
        this.confirmDialog();
        this.reloadCurrentRoute();
      }
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else if(err.status == 201){
          this.toast.error('Department Name is Already Exits!');
        }else{
          this.toast.error('Error in submission!');
        }
      }
    );
  }

  onUpdateForm() {
    Object.keys(this.departmentForm.controls).forEach(key => {
      this.departmentForm.controls[key].markAsTouched();
    });
    this.submitted = false;
    if (this.departmentForm.invalid) {
      this.toast.error('Required fields should not be empty.', 'Error Occurred!');
      return;
    }
    let val = this.departmentForm.value;
    const data = {
      department_name: val.department_name,
    };
    this._configurationalMasterService.updateDepartment(this.data.id,data).subscribe(
      (res: any) => {
        if(res.message=="Department Name is Already Exits!"){
        this.toast.warning('Department Name is Already Exits!');
      }
      else{
        this.toast.success('Department Update Successfully');
      }
        this.route.navigate([
          'master/itticket/configurational-master/department',
        ]);
        this.confirmDialog();
        this.reloadCurrentRoute();
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else if(err.status == 409){
          this.toast.error('Department Name is Already Exits!');
        }else{
          this.toast.error('Error in submission!');
        }
      }
    );
  }
  confirmDialog() {
    this.dialog.close(this.departmentForm.value);
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

}
