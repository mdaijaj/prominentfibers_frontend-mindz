import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { PaySlipDilogComponent } from './pay-slip-dilog/pay-slip-dilog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-pay-slip',
  templateUrl: './generate-pay-slip.component.html',
  styleUrls: ['./generate-pay-slip.component.scss'],
})
export class GeneratePaySlipComponent {
  EmpListData: any;

  public month = [
    { value: 'January' },
    { value: 'February' },
    { value: 'March' },
    { value: 'April' },
    { value: 'May' },
    { value: 'June' },
    { value: 'July' },
    { value: 'August' },
    { value: 'September' },
    { value: 'October' },
    { value: 'November' },
    { value: 'December' },
  ];
  paySlipForm: FormGroup;

  constructor(
    private route: Router,
    private hrServies: HrServiceService,
    private fb: FormBuilder,public dialog: MatDialog
  ) {
    this.getEmpList();

    this.paySlipForm = this.fb.group({
      fiscal_year: new FormControl(null, [Validators.required]),
      pay_period: new FormControl(null, [Validators.required]),
      employee: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.getEmpList();
  }

  getEmpList() {
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    });
  }

  onCancel(path: any) {
    this.route.navigate([path]);
  }

  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(PaySlipDilogComponent, {
      width: '800px',
      data: { id: e.value},
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
