import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeadService } from '../services/head.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../services/lead.service';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { CrmService } from '../services/crm/crm.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  // public collapsed: boolean = false;
  public collapsed: boolean = false;
  public farward: boolean = true;
  MenuData: any;
  sidebarList: any;
  handleSidebarData: boolean = true;
  dashboardActive: boolean = false;
  // navIndexvalue: any = null;
  activeModuleIndex: number | null = null;
  activeSubModuleIndex: number | null = null;
  menuSubscription: Subscription;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  constructor(private head: HeadService,
    private leade: LeadService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private _authservice: AuthService) {
    this.head.nav.subscribe(data => {
      this.farward = data;
    })
  }

  config: any;

  ngOnInit() {
    // Active dashboard start
    const fullUrl: string = window.location.href;
    if (fullUrl.includes("hrms/employee-master/dashboard")) this.dashboardActive = true;
    else this.dashboardActive = false;
    // Active dashbaord end

    this.checkSidebar();
    if (this.handleSidebarData) {
      this.getModule();
    }
    else {
      this.getSidebarData();
    }
  }

  getModule() {
    this.menuSubscription = this.leade.getModule().subscribe(
      (res: any) => {
        this.MenuData = res;
        let list = res;
        let modifyList = true;
        list?.map((menu: any) => {
          if (menu?.isActive == true) {
            return modifyList = false;
          }
        })
        if (modifyList) {
          list?.map((menu: any) => {
            menu.isActive = false;
            menu?.superModules?.map((subMenu: any) => {
              subMenu.isActive = false;
              subMenu?.submenu_masters?.map((subSubMenu: any) => {
                subSubMenu.isActive = false;
              })
            })
          })
        }
        this.sidebarList = list;
      }
    )
  }

  checkSidebar() {
    this.menuSubscription = this.leade.getSidebarOpen().subscribe(
      (res: any) => {
        this.handleSidebarData = res;
      }
    )
  }

  getSidebarData() {
    this.menuSubscription = this.leade.getSidebarData().subscribe(
      (res: any) => {
        if (res?.length) {
          this.sidebarList = res;
        }
      }
    )
  }

  // navToggel(index: any,nav:any) {
  //   let clip: any = document.getElementById('clip');
  //   if (this.navIndexvalue == index) {
  //     this.navIndexvalue = null;
  //   } else {
  //     this.navIndexvalue = index;
  //     localStorage.setItem("index", index);
  //     localStorage.setItem("navAccess",JSON.stringify(nav))
  //   }
  // }
  navToggle(moduleIndex: number, subModuleIndex: number | null): void {

    if (this.activeModuleIndex === moduleIndex && this.activeSubModuleIndex === subModuleIndex) {
      // Clicking the same module or submodule again, so close it
      this.activeModuleIndex = null;
      this.activeSubModuleIndex = null;
    } else {
      // Clicking a different module or submodule, so open it
      this.activeModuleIndex = moduleIndex;
      this.activeSubModuleIndex = subModuleIndex;
    }
  }
  navigateTo(url: string, nav: any) {
    // Additional logic if needed before navigation
    this.router.navigate([url]);

    // If you want to preserve the active state, you can set the activeModuleIndex here.
    // For example: this.activeModuleIndex = this.MenuData.indexOf(nav);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      let nav = document.querySelectorAll('.nav-item');
      // 
      nav.forEach(async (e: any) => {
        let isExist = await e.classList;
        if (isExist) {
          if (isExist.contains('activ')) {
            // 
            this.setSubM(Number(e.id));
            // 
          }
        }
      })
    }, 500)
  }

  getModules_id(supSuperM_id: any) {
    // 
    this.setSubM(supSuperM_id)
  }

  setSubM(id: any) {
    // 
    let subModulesList: any = []
    for (let i = 0; i < this.MenuData?.length; i++) {
      if (this.MenuData[i]?.subSuperModule_Id === id) {
        let subModules = this.MenuData[i]?.superModules
        // 
        for (let j = 0; j < subModules.length; j++) {
          let subMo = {
            menuIcon: subModules[j]?.submenu_masters_icon,
            menuLink: subModules[j]?.submenu_masters_link,
            menuName: subModules[j]?.submenu_master_name,
            subModule_id: subModules[j]?.submenu_master_id,
            superModule_Id: this.MenuData[i]?.superModule_Id,
            subSuperModule_Id: this.MenuData[i]?.subSuperModule_Id,
            superModule: this.MenuData[i]?.superModule,
            moduleType: `sub module of ${this.MenuData[i]?.menuName}`
          }
          subModulesList.push(subMo);
        }
      }
    }
    // 
    this._authservice.setSubModules(subModulesList)
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }
  fun() {
    this.farward = false;
  }
  navBarToggle() {
    const selectedsidebar = document.querySelector(".left_sidebar");
    const selectedMainDiv = document.querySelector(".right-content-wrapper");

    if (selectedsidebar?.classList.contains("hide_click")) {
      selectedsidebar?.classList.remove("hide_click")
      selectedMainDiv?.classList.remove("full_width")
      return
    }
    selectedsidebar?.classList.add("hide_click")
    selectedMainDiv?.classList.add("full_width")
  }

  navigateTOModule(nav: any) {
    console.log(nav, "llllllllllllll");
    this.router.navigateByUrl('master/' + nav.superMenuLink);
  }
  navigateTOSubModule(nav: any) {
    console.log(nav, "jjjjjjjjjjjj");
    this.router.navigateByUrl(nav.superModules.menu_master_link);
  }

  // Sidebar dropdown menu start
  openMenu(navData: any) {
    this.dashboardActive = false;
    this.sidebarList?.map((menu: any) => {
      if (navData?.subSuperModule_Id == menu?.subSuperModule_Id) {
        if (menu.isActive) {
          menu.isActive = false;
        }
        else {
          menu.isActive = true;
        }
      }
      else {
        menu.isActive = false;
      }
    });

  }

  openSubMenu(navData: any) {
    this.sidebarList?.map((menu: any) => {
      menu?.superModules?.map((subMenu: any) => {
        if (subMenu?.menu_master_id == navData?.menu_master_id) {
          if (subMenu.isActive) {
            subMenu.isActive = false;
          }
          else {
            subMenu.isActive = true;
          }
        }
        else {
          subMenu.isActive = false;
        }

        if (!navData?.submenu_masters?.length) {
          this.leade.setSidebarOpen(false);
          this.leade.setSidebarData(this.sidebarList);
          let url = navData?.module_master_link + '/' + navData?.menu_master_link;
          this.router.navigateByUrl('master/' + url);
        }
      })
    });
  }

  openSubSubMenuPage(navData: any) {
    this.leade.setSidebarOpen(false);
    this.leade.setSidebarData(this.sidebarList);
    this.sidebarList?.map((menu: any) => {
      menu?.superModules?.map((subMenu: any) => {
        subMenu?.submenu_masters?.map((subSubMenu: any) => {
          if (subSubMenu?.submenu_master_id == navData?.submenu_master_id) {
            if (subSubMenu.isActive) {
              subSubMenu.isActive = false;
            }
            else {
              subSubMenu.isActive = true;
            }
          }
          else {
            subSubMenu.isActive = false;
          }
        })
      })
    });
    
    let url = "";
    url = navData?.module_master_link + '/' + (navData?.menu_master_link ? `${navData?.menu_master_link}/` : '') + navData?.submenu_masters_link;
    this.router.navigateByUrl('master/' + url);
  }
  // Sidebar dropdown menu end

  goInToPage(m: any) {
    let loginUser: any = localStorage.getItem('signInUser');
    let role_id: any = JSON.parse(loginUser).role_id;
    this._authservice.getModuleActions(role_id, m).subscribe(
      (res) => {
        console.log(res.data.options, ' < --module assign action');
      },
      (err) => {
        console.log(err);
      }
    )
  }

}