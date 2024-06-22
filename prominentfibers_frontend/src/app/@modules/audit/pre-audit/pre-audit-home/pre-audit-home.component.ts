import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';

@Component({
  selector: 'app-pre-audit-home',
  templateUrl: './pre-audit-home.component.html',
  styleUrls: ['./pre-audit-home.component.scss'],
})
export class PreAuditHomeComponent implements OnInit, OnDestroy {
  subModules: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {

        this.subModules = res;
        console.log(this.subModules);

      });
  };

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
  
  ngOnDestroy(): void {
    this.subM.unsubscribe();
  };

  img() {
    this.route.navigate(['master/hrms/recuitment-module/job-list']);
  }

  profile() {
    this.route.navigate(['master/hrms/recuitment-module/profile-list']);
  }
  profile1() {
    this.route.navigate(['master/hrms/recuitment-module/profile-list']);
  }
  // verify_invoice(){
  //   this.route.navigate(['master/audit/pre-audit/task-order'],
  //   {queryParams:{invoice:'yes'}});
  // }
}
