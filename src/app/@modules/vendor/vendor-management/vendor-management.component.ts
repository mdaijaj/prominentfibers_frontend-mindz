import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent {
  clicked: boolean = false;
  subModules: any;
  suSupModule: any;
  subM: any;
  constructor(private route: Router, private _authServie: AuthService,private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
        
        this.subModules = res;
      });

      this.head.clicked.subscribe(data => {
        this.clicked = data;
      })
  
      // if (this.router.url) {
      //   this.lead.setModule(this.leftMenuData)
      // }
  
  
      let lg: any = localStorage.getItem('signInUser')
      let loginUser = JSON.parse(lg);
      let sub = this._authservice.getAllAccess_Modules(loginUser.role_id).subscribe(
        (res) => {
          // 
          this.suSupModule = this._authservice.getSubSuperModules().subscribe(
            (res: any) => {
              
              if (this.router?.url) {
                this.lead.setModule(res)
              }
              if (this.router.url === '/master/vendor') {
                if (res) {
                  this.router.navigate([`master/vendor/${res[0]?.menuLink}`]);
                };
              };
      
              this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
                if (this.router.url === '/master/vendor') {
                  if (res) {
                    this.router.navigate([`master/vendor/${res[0]?.menuLink}`]);
                  };
                };
              });
            }
          )
          sub?.unsubscribe();
        }
      )
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
