import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeadService } from 'src/app/@shared/services/head.service';
import { NavigationEnd, Router } from '@angular/router';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit, OnDestroy {
  clicked: boolean = false;
  suSupModule: any;
  constructor(private head: HeadService, private router: Router, private lead: LeadService, private _authservice: AuthService) {
  }

  leftMenuData: any = [
    { id: 1, module: 'LMS', menuName: 'LMS Dashboard', menuLink: 'lms-home/dashboard-lms', menuIcon: 'dashboard' },
    { id: 2, module: 'LMS', menuName: 'Author Management', menuLink: 'lms-home/author-master', menuIcon: 'supervisor_account' },
    { id: 4, module: 'LMS', menuName: 'Course Management', menuLink: 'lms-home/Schedule-traing', menuIcon: 'chrome_reader_mode' },
    { id: 3, module: 'LMS', menuName: 'User Management', menuLink: 'lms-home/mangement-user', menuIcon: 'supervised_user_circle' },
    { id: 5, module: 'LMS', menuName: 'Assesment', menuLink: 'lms-home/assessment', menuIcon: 'assignment' },
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
        // 
        this.suSupModule = this._authservice.getSubSuperModules().subscribe(
          (res: any) => {

            if (this.router?.url) {
              this.lead.setModule(res)
            }
            if (this.router.url === '/master/warehouse-management') {
              if (res) {
                this.router.navigate([`master/warehouse-management/${res[0]?.menuLink}`]);
              };
            };

            this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
              if (this.router.url === '/master/warehouse-management') {
                if (res) {
                  this.router.navigate([`master/warehouse-management/${res[0]?.menuLink}`]);
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