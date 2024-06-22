import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entitlement',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.scss']
})
export class EntitlementComponent {
  EntitlementForm:FormGroup;
  styles: boolean= false;
  prorate: boolean= false;
  reset: boolean= false;
  credit: boolean= false;
  openingBalanceState:boolean=false;
  maximumBalanceState:boolean=false;
  constructor(private route: Router, private fb: FormBuilder) {

    this.EntitlementForm = this.fb.group({ 
      accrual_leave: new FormControl(null, [Validators.required]),
      reset_leave: new FormControl(null, [Validators.required]),
      credit_leave: new FormControl(null, [Validators.required]),
      prorate_leave: new FormControl(null, [Validators.required]),
      opening_balance: new FormControl(null, [Validators.required]),
      maximum_balance: new FormControl(null, [Validators.required]),
    })
  }

  accrualLeave () {
    if (this.EntitlementForm.value.accrual_leave == true){
     this.styles= true;
    } else {
      this.styles=false;
    }
  }

  resetLeave () {
    if (this.EntitlementForm.value.reset_leave == true){
     this.reset= true;
    } else {
      this.reset=false;
    }
  }

  creditLeave () {
    if (this.EntitlementForm.value.credit_leave == true){
     this.credit= true;
    } else {
      this.credit=false;
    }
  }

  prorateLeave () {
    if (this.EntitlementForm.value.prorate_leave == true){
     this.prorate= true;
    } else {
      this.prorate=false;
    }
  }

  maximumBalance () {
    if (this.EntitlementForm.value.maximum_balance == true){
      this.maximumBalanceState= true;
     } else {
       this.maximumBalanceState=false;
     }
  }

  openingBalance (){
    if (this.EntitlementForm.value.opening_balance == true){
      this.openingBalanceState= true;
     } else {
       this.openingBalanceState=false;
     }
  }
}
