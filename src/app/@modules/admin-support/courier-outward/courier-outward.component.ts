import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';

@Component({
  selector: 'app-courier-outward',
  templateUrl: './courier-outward.component.html',
  styleUrls: ['./courier-outward.component.scss']
})
export class CourierOutwardComponent {
  subModules: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
        console.log(res, 'sub modules in Account Receivable');
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

}
