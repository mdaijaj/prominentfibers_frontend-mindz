import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';


@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.scss']
})
export class LeaveMasterComponent implements OnInit, OnDestroy {
  subModules: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
        this.subModules = res;
      });
  };

  ngOnDestroy(): void {
    this.subM.unsubscribe();
  };

  goInToPage(link:any, m:any){
    this.route.navigate([link])
    console.log(m);
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

  goToHoliday(path:any) {
    this.route.navigate([path]);
  }

  goToLeavePolice(path:any){
    this.route.navigate([path])
  }

}
