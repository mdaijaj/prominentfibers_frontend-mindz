import { Component, OnInit } from '@angular/core';
import { HeadService } from 'src/app/@shared/services/head.service';
import { NavigationEnd, Router } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';

@Component({
  selector: 'app-expense-mangeme-main',
  templateUrl: './expense-mangeme-main.component.html',
  styleUrls: ['./expense-mangeme-main.component.scss']
})
export class ExpenseMangemeMainComponent {
  clicked: boolean = false;
  suSupModule:any;

  constructor(private head:HeadService,private router:Router, private lead:LeadService, private _authservice:AuthService){

  }
  leftMenuData:any = [
    {id:1, module:'HR Management' ,menuName:'My Expense',menuLink:'expense-managment',menuIcon:'account_balance_wallet'},

    {id:2, module:'HR Management' ,menuName:'Travel Request',menuLink:'travel-request',menuIcon:'account_balance_wallet'}

  ]
    
  ngOnInit(): void {
    this.head.clicked.subscribe(data=>{
      this.clicked = data;
    })
    
    this.head.clicked.subscribe(data=>{
      this.clicked = data;
    })
    
    // if(this.router.url){
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
              this.lead.setModule(res);
            };

            if (this.router.url === '/master/expense-main') {
              if (res) {
                this.router.navigate([`master/expense-main/${res[0]?.menuLink}`]);
              };
            };
    
            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/expense-main') {
                if (res) {
                  this.router.navigate([`master/expense-main/${res[0]?.menuLink}`]);
                };
              };
            });
            
          })
          
        sub.unsubscribe();
      }
    )
  }
  ngOnDestroy(): void {
    this.suSupModule?.unsubscribe();
  }
}
