import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit, OnDestroy {
  clicked: boolean = false;
  suSupModule: any;
  constructor(private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) {

  }
  leftMenuData:any = [
    {id:1, module:'Lead Management', menuName:'Lead Management',menuLink:'lead-management',menuIcon:'bookmark'},
    {id:2, module:'Lead Management', menuName:'Prospects',menuLink:'lead-prospect',menuIcon:'donut_small'},
    {id:3, module:'Lead Management', menuName:'Accounts',menuLink:'lead-account',menuIcon:'account_box'},
    {id:4, module:'Lead Management', menuName:'Opportunities',menuLink:'lead-opportunity',menuIcon:'grade'},
    {id:5, module:'Lead Management', menuName:'Quotation',menuLink:'quotation',menuIcon:'note_add'},
    {id:5, module:'Lead Management', menuName:'Inter Company Module',menuLink:'inter-company',menuIcon:'library_add'},
    // {id:5, module:'Lead Management', menuName:'Pre Audit',menuLink:'pre-audit',menuIcon:'work'},
    // {id:6, module:'Lead Management', menuName:'Post Audit',menuLink:'post-audit',menuIcon:'assistant'},
    {id:6, module:'Lead Management', menuName:'Accreditation Mgmt',menuLink:'existing-customer',menuIcon:'important_devices'},
    {id:7, module:'Lead Management', menuName:'Reports',menuLink:'reports',menuIcon:'timeline'},
  ]


  ngOnInit(): void {
    this.head.clicked.subscribe(data => {
      this.clicked = data;
    })

    // if (this.router?.url) {
    //   this.lead.setModule(this.leftMenuData)
    // }

    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);

    let sub = this._authservice.getAllAccess_Modules(loginUser.role_id).subscribe(
      (res) => {
        // 
        this.suSupModule =   this._authservice.getSubSuperModules().subscribe(
          (res: any) => {
            
            if (this.router?.url) {
              this.lead.setModule(res)
            }
            if (this.router.url === '/master/lead') {
              if (res) {
                this.router.navigate([`master/lead/${res[0]?.menuLink}`]);
              };
            };
    
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/lead') {
                if (res) {
                  this.router.navigate([`master/lead/${res[0]?.menuLink}`]);
                };
              };
            });
          }
        )
        sub.unsubscribe();
      }
    )
  }

  ngOnDestroy(): void {
    this.suSupModule?.unsubscribe();
  }
}
