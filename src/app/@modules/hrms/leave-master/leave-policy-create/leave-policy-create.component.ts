import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-leave-policy-create',
  templateUrl: './leave-policy-create.component.html',
  styleUrls: ['./leave-policy-create.component.scss']
})
export class LeavePolicyCreateComponent {
  leavePolicyForm:FormGroup;
  constructor(private route: Router, private fb: FormBuilder) {

    this.leavePolicyForm = this.fb.group({
      leave_name: new FormControl(null, [Validators.required]),
      leave_count: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      leave_type: new FormControl(null, [Validators.required]),
      leave_currently: new FormControl(null, [Validators.required]),
    })


  }

  goBackHolidayList(path:any){
  this.route.navigate([path])
  }

  onSubmitForm() {
    let val = this.leavePolicyForm.value;
    
    const data = {
    
    };
    
    
}

  onCancel(){
    this.leavePolicyForm.reset();
    this.route.navigate(['/master/hrms/leave-master/leave-policy'])

  }
   
}
