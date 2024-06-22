import { Component, Inject } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,ValidatorFn,AbstractControl,FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-sales-order-form-dialog',
  templateUrl: './sales-order-form-dialog.component.html',
  styleUrls: ['./sales-order-form-dialog.component.scss']
})

export class SalesOrderFormDialogComponent {
  create_fglist_Form:FormGroup;
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
    public dialog: MatDialogRef<SalesOrderFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.create_fglist_Form = this.fb.group({
      product_name: new FormControl(null),
      product_code: new FormControl(null),
      product_variant: new FormControl(null),
     })
  }
  ngOnInit() {
  
  }

  onSubmitForm() {
    this.confirmDialog();
  }

  confirmDialog() {
    this.dialog.close();
  }

}
