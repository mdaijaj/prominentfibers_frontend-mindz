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
  constructor(private route: Router, private hrServies: HrServiceService,
    private fb: FormBuilder, private toast: ToastrService,
    private activeroute: ActivatedRoute,private location: Location) {

    this.addForm = this.fb.group({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      notes: new FormControl(null, [Validators.required]),
      record_added_by: new FormControl(null, [Validators.required]),
      record_added_on: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      
      this.component_id = params.component_id;
      
    });

    if (this.component_id) {
      this.hrServies.addGetById(this.component_id).subscribe((res: any) => {
        this.singleAddData = res.data;
        
        this.addForm.patchValue({
          code: this.singleAddData.code,
          name: this.singleAddData.name,
          notes: this.singleAddData.notes,
          record_added_by: this.singleAddData.record_added_by,
          record_added_on: this.singleAddData.record_added_on,
        });
      })
    } else {
      
    }

    this.hrServies.getAddTypeList().subscribe((res: any) => {
      this.addCodeData = res.data;
      
    }); 

  }
  goBack() {
    this.location.back();
  }

  onCancel (path:any){
  this.route.navigate([path])
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
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-component']);
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
        this.route.navigate(['master/hrms/payroll/payroll-master/payroll-component/add-component']);
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
