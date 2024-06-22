import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.scss']
})
export class AdminSupportComponent {
  clicked: boolean = false;
  suSupModule: any;
  constructor(private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) {
  }

  leftMenuData: any = [
    { id: 1, module: 'Admin Support', menuName: 'Courier Inward', menuLink: 'courier-inward', menuIcon: 'pages'},
    { id: 2, module: 'Admin Support', menuName: 'Courier Outward', menuLink: 'courier-outward', menuIcon: 'terrain'},
    { id: 3, module: 'Admin Support', menuName: 'AMC Agreement', menuLink: 'amc-agreement', menuIcon: 'casino'},
    { id: 4, module: 'Admin Support', menuName: 'Rental Agreement', menuLink: 'rental-agreement', menuIcon: 'streetview'},
    { id: 5, module: 'Admin Support', menuName: 'HK/S Agreement', menuLink: 'house-keeping-sicurity-agreement', menuIcon: 'event_available'},
    { id: 6, module: 'Admin Support', menuName: 'Insurance Agreement', menuLink: 'insurance-agreement', menuIcon: 'domain'},
    { id: 7, module: 'Admin Support', menuName: 'Remote Office Facility', menuLink: 'remote-office-facility', menuIcon: 'settings_remote'},
    { id: 8, module: 'Admin Support', menuName: 'Event Management', menuLink: 'event-management', menuIcon: 'whatshot'},
    { id: 9, module: 'Admin Support', menuName: 'Forex Currency', menuLink:'forex-currency', menuIcon: 'poll'},
  ]
  ngOnInit(): void {
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
        // console.log(res);
        this.suSupModule = this._authservice.getSubSuperModules().subscribe(
          (res: any) => {
            console.log(res, ' <- sub super modules in lms');
            if (this.router?.url) {
               this.lead.setModule(res)
            }
            if (this.router.url === '/master/admin-support') {
              if (res) {
                this.router.navigate([`master/admin-support/${res[0]?.menuLink}`]);
              };
            };
    
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/admin-support') {
                if (res) {
                  this.router.navigate([`master/admin-support/${res[0]?.menuLink}`]);
                };
              };
            });
          }
        )
        sub?.unsubscribe();
      }
    )

  }

  ngOnDestroy(): void {
    this.suSupModule?.unsubscribe();
  }
}
