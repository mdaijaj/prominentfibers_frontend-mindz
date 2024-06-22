import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';

@Component({
  selector: 'app-opportunity-home',
  templateUrl: './opportunity-home.component.html',
  styleUrls: ['./opportunity-home.component.scss'],
})
export class OpportunityHome implements OnInit, OnDestroy {
  subModules: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
        
        this.subModules = res;
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
}
