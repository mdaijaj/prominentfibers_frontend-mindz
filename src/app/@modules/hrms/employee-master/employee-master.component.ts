import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.scss'],
})
export class EmployeeMasterComponent implements OnInit, OnDestroy{
  subModules: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService) { }

   filterMenuNames = ['Grievance', 'Pay', 'Leave Apply', 'Attendance Calendar'];
  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
   
        
        // this.subModules = res;
        this.subModules = res?.filter((item:any) => !this.filterMenuNames.includes(item.menuName));
       
      });
  };

  ngOnDestroy(): void {
    this.subM.unsubscribe();
  };

  img() {
    this.route.navigate(['master/hrms/employee-master/employ']);
  }

  img1() {
    this.route.navigate(['master/hrms/employee-master/announcement-list']);
  }

  goInToPage(m:any){
    let loginUser: any = localStorage.getItem('signInUser');
    let role_id: any = JSON.parse(loginUser).role_id;
    this._authServie.getModuleActions(role_id,m).subscribe(
      (res)=>{
        console.log(res.data.options, ' < --module assign action');
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}