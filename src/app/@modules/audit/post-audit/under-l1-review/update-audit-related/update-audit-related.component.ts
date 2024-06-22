import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-update-audit-related',
  templateUrl: './update-audit-related.component.html',
  styleUrls: ['./update-audit-related.component.scss']
})
export class UpdateAuditRelatedComponent implements OnInit {
  // postAuditForm: any;
  // reject:any;
  rejectionForm: FormGroup;
  @Input() postAuditForm: FormGroup;
  @Input() reject: any;
  @Output() reject1 = new EventEmitter<any>();
  check: any;
  check_status: any;
  completeData: any;
  concompleteData: any;
  payload:any;

  constructor(private fb: FormBuilder, private _configurationalMasterService: ConfigurationalmasterService,
    private route: Router, private activetRoute: ActivatedRoute,
    private toaster: ToastrService, private router: Router) {
    this.rejectionForm = this.fb.group({
      cFirstOne: new FormControl(null),
      cFirstTwo: new FormControl(null),
      cFirstThree: new FormControl(null),
      cFirstFour: new FormControl(null),
      cFirstFive: new FormControl(null),
      cFirstSix: new FormControl(null),
      cFirstSeven: new FormControl(null),
      cFirstEight: new FormControl(null),
      cSecondOne: new FormControl(null),
      cSecondTwo: new FormControl(null),
      cSecondThree: new FormControl(null),
      cSecondFive: new FormControl(null),
      cLastOne: new FormControl(null),
      cLastTwo: new FormControl(null),
      cLastThree: new FormControl(null),
      cLastFive: new FormControl(null)

    });
  }
  ngOnInit(): void {
    this.getCompleteness();
    this.getAllconcompleteness();
  }
  // statusChange(e: any) {
  //   this.reject = e.value;
  //   // this.reject1.emit(this.reject);

  // }
  checkBox(e: any) {
    this.check = e.source.value;
    this.check_status = e.checked;
  }
  getCompleteness() {
    this._configurationalMasterService.getAllCompleteness().subscribe((res: any) => {
      this.completeData = res.data;
      
    })
  }
  getAllconcompleteness() {
    this._configurationalMasterService.getAllconcompleteness().subscribe((res: any) => {
      this.concompleteData = res.data;
      
    })
  }
  checkOne(l1review_id: any, data: any) {
    data.code_status = l1review_id.checked;
    this.updateCompleteness(l1review_id, data);

    
  }
  updateCompleteness(id: any, data: any) {
    this._configurationalMasterService.updateCompleteness(id, data).subscribe(
      (res: any) => {
        
        this.toaster.success('Completeness Updated Successfully');
      },
      (err: any) => {
        this.toaster.error(
          "discription is All Ready Exits!",
          'Error Message'
        );
        
      }
    );
  }

  checkCompletenessFirst(e: any, value: any) {
    this.reject1.emit(this.checkk());
        let obj:any = {}
    obj[value]= e.checked
    
    // if (value == 'approved' && e.checked == true) {
    //   this.rejectionForm.controls['cFirstOne'].setValue(true)
    // }
    // else if (value == 'approved' && e.checked == false){
    //   this.rejectionForm.controls['cFirstOne'].setValue(false)
    // }

    // else if (value == 'approved_with_conditions' && e.checked == true) {
    //   this.rejectionForm.controls['cFirstTwo'].setValue(true)
    // }
    // else if (value == 'approved_with_conditions' && e.checked == false){
    //   this.rejectionForm.controls['cFirstTwo'].setValue(false)
    // }

    // else if (value == 'follow_up_audit_required' && e.checked == true) {
    //   this.rejectionForm.controls['cFirstFour'].setValue(true)
    // }
    // else if (value == 'follow_up_audit_required' && e.checked == false){
    //   this.rejectionForm.controls['cFirstFour'].setValue(false)
    // }

    // else if (value == 'rejected' && e.checked == true) {
    //   this.rejectionForm.controls['cFirstFour'].setValue(true)
    // }
    // else if (value == 'rejected' && e.checked == false){
    //   this.rejectionForm.controls['cFirstFive'].setValue(false)
    // }

  }
  checkCompletenessSecond(e: any) {
    this.reject1.emit(this.checkkk());
  }
  checkCompletenessLast(e: any) {
    this.reject1.emit(this.checkkkk());
  }

  checkk() {
    let val = this.rejectionForm.value;
     this.payload={
      approved: val.cFirstOne,
      approved_with_conditions: val.cFirstTwo,
      required_correction:val.cFirstThree,
      follow_up_audit_required: val.cFirstFour,
      rejected: val.cFirstFive,
      comments: val.cFirstSix,
      name: val.cFirstSeven,
      date: val.cFirstEight
    }
    this._configurationalMasterService.createconcompleteness(this.payload).subscribe(
      (res: any) => {
        this.toaster.success('1st Completeness Check Created Successfully');
      },
      (err: any) => {
        this.toaster.error(
          "discription is All Ready Exits!",
          'Error Message'
        );
        
      }
    );
  }
  checkkk() {
    let val = this.rejectionForm.value;
     this.payload={
      approved: val.cFirstOne,
      approved_with_conditions: val.cFirstTwo,
      required_correction:val.cFirstThree,
      follow_up_audit_required: val.cFirstFour,
      rejected: val.cFirstFive,
      comments: val.cFirstSix,
      name: val.cFirstSeven,
      date: val.cFirstEight
    }
    this._configurationalMasterService.createconcompleteness(this.payload).subscribe(
      (res: any) => {
        this.toaster.success('2nd Completeness Check Created Successfully');
      },
      (err: any) => {
        this.toaster.error(
          "discription is All Ready Exits!",
          'Error Message'
        );
        
      }
    );
  }
  checkkkk() {
    let val = this.rejectionForm.value;
     this.payload={
      approved: val.cFirstOne,
      approved_with_conditions: val.cFirstTwo,
      required_correction:val.cFirstThree,
      follow_up_audit_required: val.cFirstFour,
      rejected: val.cFirstFive,
      comments: val.cFirstSix,
      name: val.cFirstSeven,
      date: val.cFirstEight
    }
    this._configurationalMasterService.createconcompleteness(this.payload).subscribe(
      (res: any) => {
        this.toaster.success('last Completeness Check Created Successfully');
      },
      (err: any) => {
        this.toaster.error(
          "discription is All Ready Exits!",
          'Error Message'
        );
        
      }
    );
  }

  onParentMenuChecked(parentData:any){
    parentData.code_status = !parentData.code_status;
    if (parentData.sub_menu) {
      parentData.sub_menu.forEach((subMenu:any) => subMenu.checked = parentData.code_status);
    }
  }
  onSubMenuChecked(parentData:any,childData:any){
    childData.checked = !childData.checked;
    if (parentData.sub_menu) {
      parentData.code_status = parentData.parentData.every((subMenu:any) => subMenu.checked);
    }
  }


  // onParentMenuToggle(parent: MenuItem) {
  //   parent.checked = !parent.checked;
  //   if (parent.subMenus) {
  //     parent.subMenus.forEach(subMenu => subMenu.checked = parent.checked);
  //   }
  // }

  // onSubMenuToggle(parent: MenuItem, subMenu: MenuItem) {
  //   subMenu.checked = !subMenu.checked;
  //   if (parent.subMenus) {
  //     parent.checked = parent.subMenus.every(subMenu => subMenu.checked);
  //   }
  // }

  // onSaveData() {
  //   // Here, you can process the data to be saved to the backend
  //   const dataToSave = this.menuItems.filter(parent => parent.checked);
  //   console.log(dataToSave);
  // }
}
