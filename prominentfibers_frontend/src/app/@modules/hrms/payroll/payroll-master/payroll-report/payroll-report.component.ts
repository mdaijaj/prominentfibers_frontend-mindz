import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  styleUrls: ['./payroll-report.component.scss']
})
export class PayrollReportComponent {

constructor(private route: Router){}

 public data =[
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'PAY REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'WAGES REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'MUSTER ROLL'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'REGISTER OF EMPLOYEE'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'ESIC',
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'DEDUCTION REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'FINE REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'ADVANCE REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'REGISTER OF WORKMAN'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'EQUAL REMUNERATION'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'OVERTIME REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'LEAVE REGISTER'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'REIMBURSEMENT'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'EMPLOYEEEXPENSE'
  },
  {
    img : "assets//icons/icon_DQS/report.png",
    title:'PF ECR'
  },
  // {
  //   img : "assets//icons/icon_DQS/report.png",
  //   title:'PAY REGISTER'
  // }
 ]

 reportGenerate (path:any){
 this.route.navigate([path])
 }

}
