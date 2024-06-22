import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Login } from './login-modal/loginModal';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

const databaseKey: any = environment.servralUrl;

const routes = {
  auth: {
    login: () => `${databaseKey}/api/auth/signin`,
    getAllAccess_menu: (id: any) =>
      `${databaseKey}/api/v1/getroleMenuAccess/${id}`,
    create_Attendance: () => `${databaseKey}/api/v1/create_Attendance`,
    screenMode: () => `${databaseKey}/api/v1/create_Screen_On_Off`,
    getAssignAction: (id: any) =>
      `${databaseKey}/api/v1/getassignactionfucntion/${id}`,
  },
};

interface ModuleAction {
  Read: boolean;
  Write: boolean;
  Delete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private route: Router,
    private toster: ToastrService
  ) { }
  userS: any = new BehaviorSubject(null);
  allModules: any;
  accessModules: any = new BehaviorSubject(null);
  superModules: any = new BehaviorSubject(null);
  subSuper_Modules: any = new BehaviorSubject(null);
  sub_Modules: any = new BehaviorSubject(null);
  moduls_IDs: any = new BehaviorSubject(null);
  subSuperModulesId: any
  superM_ID: any;
  subSuperM_ID: any;
  superModuesInMaster: any = new BehaviorSubject(null);
  signIn(data: any): Observable<any> {
    return this.http.post<any>(routes.auth.login(), data).pipe(
      tap((res) => {
        console.log(res, "sign in ");

        if (
          (res.role_menu_access_data &&
            res.role_menu_access_data?.length === 0) ||
          !res.role_menu_access_data ||
          !res.employee_id
        ) {
          this.toster.warning(
            'Sorry, You do not have access of any modules in ERP',
            'Access Denied'
          );
          return;
        }

        this.authenticationUser(
          data.employee_official_email,
          res.accessToken,
          res.employee_photo,
          res.first_name,
          res.employee_id,
          res.roles,
          res.employee_id
        );
      })
    );
  }

  logout() {
    this.userS.next(null);
    this.route.navigate(['']);
    localStorage.removeItem('signInUser');
    localStorage.clear();
    this.superModuesInMaster.next(null);
    this.accessModules.next(null);
    this.superModules.next(null);
    this.subSuper_Modules.next(null);
    this.sub_Modules.next(null);
  }

  getAllAccess_Modules(id: any) {
    return this.http.get<any>(routes.auth.getAllAccess_menu(id)).pipe(
      tap((res) => {
        //
        
        this.allModules = res.data;
        this.setAccessModules(res.data);
        this.setSubSuperModules(this.subSuperModulesId);
      })
    );
  }

  setAccessModules(modules: any) {
    
    this.accessModules.next(modules);
    let superModules: any = [];
    for (let module of modules) {
      superModules.push({
        moduleType: 'super module',
        menuName: module.role_module_master_name,
        superModule_id: module.role_module_master_id,
        first_Icon: module.module_master_icon,
        last_Icon: module.module_master_endIcon,
        superModule_link: module.module_master_link,
      });
    }
    console.log(superModules, "response Modules");
    this.setSuper_Modules(superModules);
  }

  getAccessModules() {
    return this.accessModules;
  }

  // super modules
  setSuper_Modules(modules: any) {
    this.superModules.next(modules);
  }

  getSuper_Modules() {
    return this.superModules;
  }

  // sub super Modules of super modules
  setSubSuperModules(id: any) {
    console.log(id, "setSubSuperModules");
    
    this.subSuperModulesId = id;
    let subSuperModulesList: any = [];

    // for (let i = 0; i < this.allModules?.length; i++) {
    //   if (this.allModules[i]?.role_module_master_id === id) {
    //     let subModules = this.allModules[i].menu_masters;
    //     for (let j = 0; j < subModules?.length; j++) {
    //       let sub = {
    //         subSuperModule_Id: subModules[j].menu_master_id,
    //         superModule: subModules[j].role_module_master_name,
    //         menuName: subModules[j].menu_master_name,
    //         moduleType: `sub super module of ${subModules[j].role_module_master_name}`,
    //         menuIcon: subModules[j].menu_masters_icon,
    //         menuLink: subModules[j].menu_master_link,
    //         superModule_Id: this.allModules[i].role_module_master_id,
    //         superModules: subModules[j].submenu_masters,
    //       };
    //       subSuperModulesList.push(sub);
    //     }
    //   }
    // }
    // for (let i = 0; i < this.allModules?.length; i++) {
      // if (this.allModules[i]?.role_module_master_id === id) {
        let subModules = this.allModules;
        for (let j = 0; j < subModules?.length; j++) {
          let sub = {
            subSuperModule_Id: subModules[j].role_module_master_id,
            superModule: subModules[j].role_module_master_name,
            menuName: subModules[j].role_module_master_name,
            moduleType: `sub super module of ${subModules[j].role_module_master_name}`,
            menuIcon: subModules[j].module_master_icon,
            menuLink: subModules[j].menu_master_link,
            superMenuLink: subModules[j].module_master_link,
            // superModule_Id: this.allModules[i].role_module_master_id,
            superModules: subModules[j].menu_masters,
          };
          subSuperModulesList.push(sub);
        // }
      }
    // }
    this.subSuper_Modules.next(subSuperModulesList);
  }

  getSubSuperModules() {
    return this.subSuper_Modules;
  }

  // sub Modules of sub super modules
  setSubModules(supModules: any) {
    this.sub_Modules.next(supModules);
  }

  getSubModules() {
    return this.sub_Modules;
  }

  // check route exist or not

  chakeSubModules(route: string) {
    let re: any;
    this.getSuperModulesForMaster().subscribe((res: any) => {
      let isExist = res.find((m: any) => m.superModule_link === route);
      if (isExist) {
        re = { pass: true, route };
      } else {
        re = { pass: false, route };
      }
    });
    return re;
  }

  employeeAttendance(data: any) {
    return this.http.post<any>(routes.auth.create_Attendance(), data);
  }

  screenMode(data: any) {
    return this.http.post<any>(routes.auth.screenMode(), data);
  }

  // form master module
  setSuperModulesForMaster(modules: any) {
    this.superModuesInMaster.next(modules);
  }

  getSuperModulesForMaster() {
    return this.superModuesInMaster;
  }

  // modules ids for assign action
  setModuleIDs(m: any) {
    let ids = [m.superModule_Id, m.subSuperModule_Id, m.subModule_id];
    this.moduls_IDs.next(ids);
    localStorage.setItem('local', JSON.stringify(ids));
  }

  getModuleActions(id: any, module: any) {
    const action: ModuleAction = { Read: true, Write: true, Delete: true };
    // const body = {
    //   role_module_master_id: module.superModule_Id,
    //   menu_master_id: module.subSuperModule_Id,
    //   submenu_master_id: module.subModule_id,
    // };
    const body = {
      role_module_master_id: module.role_module_master_id,
      menu_master_id: module.menu_master_id,
      submenu_master_id: module.submenu_master_id,
    };
    return this.http.post<any>(routes.auth.getAssignAction(id), body).pipe(
      tap(
        (res) => {
          localStorage.setItem(
            'local',
            window.btoa(JSON.stringify(res.data.options))
          );
        },
        () => {
          localStorage.setItem('local', window.btoa(JSON.stringify(action)));
        }
      )
    );
  }

  //...........................................//

  authenticationUser(
    employee_official_email: string,
    token: string,
    img: string,
    name: string,
    employee_id: number,
    role: string,
    role_id: number
  ) {
    const userS = new Login(
      employee_official_email,
      token,
      img,
      name,
      employee_id,
      role,
      role_id
    );
    this.userS.next(userS);
    localStorage.setItem('signInUser', JSON.stringify(userS));
    return userS;
  }
}
