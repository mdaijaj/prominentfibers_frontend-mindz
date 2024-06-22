import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { LeadService } from 'src/app/@shared/services/lead.service';

@Component({
  selector: 'app-configurationalmaster',
  templateUrl: './configurationalmaster.component.html',
  styleUrls: ['./configurationalmaster.component.scss']
})
export class ConfigurationalmasterComponent implements OnInit, OnDestroy {
  subModules: any;
  filteredmodules:any;
  subM: any;
  clicked: boolean = false;
  suSupModule:any;
  constructor(private route: Router, private _authServie: AuthService,private router:Router, private lead: LeadService, private _authservice:AuthService) { }

  ngOnInit(): void {
    this.subM = this._authServie.getSubModules().subscribe(
      (res: any) => {
        
        this.subModules = res;
        this.filteredmodules = this.subModules;
      })

      let lg: any = localStorage.getItem('signInUser')
      let loginUser = JSON.parse(lg);

      let sub = this._authservice.getAllAccess_Modules(loginUser.role_id).subscribe(
        (res) => {
          // 
           this.suSupModule = this._authservice.getSubSuperModules().subscribe(
            (res: any) => {
              
              if(this.router?.url){
                this.lead.setModule(res)
              }
              if (this.router.url === '/master/itticket') {
                if (res) {
                  this.router.navigate([`master/itticket/${res[0]?.menuLink}`]);
                };
              };
      
              this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
                if (this.router.url === '/master/configurational-master') {
                  if (res) {
                    this.router.navigate([`master/configurational-master/${res[0]?.menuLink}`]);
                  };
                };
              });
            }
          )
          sub.unsubscribe();
        }
        
      )
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
  
  ngOnDestroy(): void {
    this.subM.unsubscribe();
  }

  filterMasterData(event:any){
    let filterValue = event.target.value
    filterValue = filterValue.trim().toLowerCase();
    this.filteredmodules = this.subModules.filter((module:any) =>
      module.menuName.toLowerCase().includes(filterValue)
    );
  }
}
