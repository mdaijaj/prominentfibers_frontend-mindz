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
// import { AddTypeDilogComponent } from '../add-component-type/add-type-dilog/add-type-dilog.component';
import * as moment from 'moment';


@Component({
  selector: 'app-add-type-create',
  templateUrl: './add-type-create.component.html',
  styleUrls: ['./add-type-create.component.scss']
})
export class AddTypeCreateComponent {
  addTypeForm: FormGroup;
  componentType_id:any;
  id: any;
  singleAddTypeData: any;
  constructor(private route: Router, private hrServies: HrServiceService,
    private fb: FormBuilder, private toast: ToastrService,
    private activeroute: ActivatedRoute,) {

    this.addTypeForm = this.fb.group({
      component_code: new FormControl(null, [Validators.required]),
      component_name: new FormControl(null, [Validators.required]),
      component_notes: new FormControl(null, [Validators.required]),
      record_addBy: new FormControl(null, [Validators.required]),
      record_add_date: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.componentType_id = params.componentType_id;
      
    });

    if (this.componentType_id) {
      this.hrServies.addTypeGetById(this.componentType_id).subscribe((res: any) => {
        this.singleAddTypeData = res.data;
        
        this.addTypeForm.patchValue({
          component_code: this.singleAddTypeData.component_code,
          component_name: this.singleAddTypeData.component_name,
          component_notes: this.singleAddTypeData.component_notes,
          record_addBy: this.singleAddTypeData.record_addBy,
          record_add_date: this.singleAddTypeData.record_add_date,
        });
      })
    } else {
      
    }

  }

  onCancel (path:any){
  this.route.navigate([path])
  }

  addTypeCreate() {
    const data = this.addTypeForm.value;
    if (this.addTypeForm.invalid) {
      this.toast.error("Required fields should not be empty", "Fields Error")
      
      return;
    }
    
    //let code = {component_code: data.component_code}

    // this.hrServies.codeTypeCreate(code).subscribe((res: any) => {
    //   
    // })


    this.hrServies.addTypeCreate(data).subscribe((res: any) => {
      
      if (res.code == 200) {
        this.toast.success(res.message);
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-component-type']);
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
    let val = this.addTypeForm.value;
    this.hrServies.updateAddType(this.componentType_id, val).subscribe(
      (res: any) => {
        
        this.toast.success('Add Type Data Updated Successfully..');
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-component-type']);
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
