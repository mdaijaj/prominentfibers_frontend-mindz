import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-create',
  templateUrl: './add-create.component.html',
  styleUrls: ['./add-create.component.scss']
})
export class AddCreateComponent {
  addForm: FormGroup;
  component_id:any;
  id: any;
  singleAddData: any;
  addCodeData: any;
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  constructor(private route: Router, private hrServies: HrServiceService,
    private fb: FormBuilder, private toast: ToastrService,
    private activeroute: ActivatedRoute,
    private location: Location) {
    this.addForm = this.fb.group({
      component_name: new FormControl(null, [Validators.required]),
      record_add_By: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
    this.addForm.controls['record_add_By'].patchValue(this.loginUserName)

    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.component_id = params.componentType_id;
      
    });

    if (this.component_id) {
      this.hrServies.addGetById(this.component_id).subscribe((res: any) => {
        this.singleAddData = res.data;
        
        this.addForm.patchValue({
          component_name: this.singleAddData.component_name,
          record_add_By: this.singleAddData.record_add_By,
        });
      })
    } else {
      
    }

    // this.hrServies.getAddTypeList().subscribe((res: any) => {
    //   this.addCodeData = res.data;
    //   
    // }); 

  }
  goBack() {
    this.location.back();
  }


  onCancel(): void {
    this.location.back();
  }
  

  addCreate() {
    const data = this.addForm.value;
    
    if (this.addForm.invalid) {
      this.toast.error("Required fields should not be empty", "Fields Error")
      
      return;
    }

    this.hrServies.addCreate(data).subscribe((res: any) => {
      
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate(['master/hrms/payroll/Payroll-component/add-component-type']);
      }

    }, (err) => {

      if (err.status === 400) {
        
        this.toast.error(err.error.message);
      }
      else if (err.status == 500) {
        this.toast.error('bad request ')
      }
      else {
        this.toast.error('Something Went Wrong!!')
      }
    });

  }

  onUpdateForm() {
    let val = this.addForm.value;
    this.hrServies.updateAdd(this.component_id, val).subscribe(
      (res: any) => {
        
        this.toast.success(res.message);
        this.route.navigate(['/master/hrms/payroll/Payroll-component/add-component-type']);
      },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else {
          this.toast.error('Error in submission!');
        }
      }
    );
  }

}
