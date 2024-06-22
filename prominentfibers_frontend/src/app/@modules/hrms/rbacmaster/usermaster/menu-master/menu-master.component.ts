import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { AssignActionPopupComponent } from './assign-action-popup/assign-action-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { e } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss'],

})
export class menuMasterComponent {
  menuAll: any;
  // subMenu: any;
  checkForm: FormGroup;
  masterSelected: boolean = false;
  roles: any;
  data: any = [];
  val: any = '';
  roleGet: any;
  trueData: any[] = [];
  falseData: any[] = [];
  isTrade: boolean = false;
  checkAllTrades: boolean = false;
  allComplete: boolean = false;
  roleAssignForm: FormGroup;
  subMenuValueId: any;
  menuValueId: any;
  masterId: any;
  menuData: any;
  subMenuData: any[] = [];
  menuCompData: any[] = [];
  roleData: any[] = [];
  subCompData: any[] = [];
  subIdData: any[] = [];
  idData: any[] = [];
  checkedData: any[] = [];
  subMenuDataNew: any[] = [];
  roleId: any;
  roleGetBy: any;
  roleGetByemployee: any;
  btnActive: boolean = false;
  selectFunctiona: boolean = false;
  subMenuItems: any;
  formulalist: any[] = [];
  newArr: never[];
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  updateRole: any;
  roleMasterId: any;
  submenuDataTwo: any[] = [];
  subMenuId: number;
  role_id: number;
  Main_Array: any = [];
  roleAll: any;
  user_id: any;
  mdata: any;
  loginUser: any;

  constructor(
    private _rbacMasterService: RbacMasterService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
    private toast: ToastrService,
    public dialog: MatDialog
  ) {
    this.roleAssignForm = this.fb.group({
      role_master_id: new FormControl(),
      employee_id: new FormControl(),
    });
  }
  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    this.getRoleAssign();
    // this.Main_Array = this.mdata

  }

  getRoleAssign() {
    this._rbacMasterService.getRole(this.loginUser.role).subscribe((res: any) => {
      this.roleGet = res.data;
      this.roleId = res.data.role_master_id;
    });
  }

  get CF_1(): any {
    return this.checkForm.controls;
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      window.location.reload();
      this.route.navigate([currentUrl]);
    });
  }

  submit() {
    let val = this.checkForm.value;

  }//updateRoleAssign
  updateRoleAssign() {
    // this.loginUserId = 2
    this._rbacMasterService.updateRoleAssign(this.user_id, this.Main_Array).subscribe((res: any) => {
      this.toast.success("Modules Assign Successfully");
      this.reloadCurrentRoute();
      // this.route.navigate([
      //   'master/hrms/rbacmaster/user-master',
      // ]);
    })

    this.mdata = this.Main_Array
  }

  changed(e: any) {

  }

  getMenu() {
    this._rbacMasterService.getAllMenu().subscribe((res: any) => {
      this.roles = res.data;
    });
  }

  onCheckboxChange(e: any) {

  }

  changeRoleModule(e: any, index: any,
    role: any,
    menu: any,
    role_id: any,
    menuName: any
  ) {
    // console.log(this.mdata,"mdata")
    let menus: any = []
    let sub_menus: any = []
    // this.role_id = role_id - 1;
    this.role_id = index;

    if (e.checked) {
      let data = {
        role_module_master_id: role_id,
        moduleName: menuName,
        forAll: true,
        forSingle: false,
        title: `Assign action of all ${menuName} modules`,
        role_id: this.user_id
      }
      this.openAssignActionPopup(data)
    }
    for (let m = 0; m < menu.length; m++) {
      if (menu[m]?.submenu_masters?.length > 0) {
        for (let s = 0; s < menu[m].submenu_masters.length; s++) {
          if (e.checked) {
            role.role_module_master_completed = true
            role.menu_masters[m].menu_completed = true
            // menu[m].menu_completed = true
            role.menu_masters[m].submenu_masters[s].submenu_completed = true
          } else {
            role.role_module_master_completed = false
            role.menu_masters[m].menu_completed = false
            role.menu_masters[m].submenu_masters[s].submenu_completed = false
          }
        }
      }
      else {
        if (e.checked) {
          role.role_module_master_completed = true
          role.menu_masters[m].role_module_master_completed = true
          role.menu_masters[m].menu_completed = true
        } else {
          role.role_module_master_completed = false
          role.menu_masters[m].role_module_master_completed = false
          role.menu_masters[m].menu_completed = false
        }
      }
    }

    // console.log(role,"ffff")
    // console.log(this.Main_Array,"this.Main_Array")
    // console.log(this.role_id,"this.role_id")
    this.Main_Array[this.role_id] = role
  }

  changeMenuAndSetAll(
    e: any,
    role: any,
    menu: any,
    submenue: any,
    menu_id: any,
    index: any,
    role_id: any,
    menuName: any,
  ) {
    let submenue_temp: any = []
    let main: any = []
    this.role_id = role_id - 1
    this.roleAll = role.menu_masters;
    if (e.checked) {
      let data = {
        role_module_master_id: role_id,
        menu_master_id: menu_id,
        moduleName: menuName,
        forAll: true,
        forSingle: false, title: `Assign action of all ${menuName} modules`,
        role_id: this.user_id
      }
      this.openAssignActionPopup(data)
    }
    for (let m = 0; m < role.menu_masters.length; m++) {
      if (role?.menu_masters[m]?.submenu_masters?.length > 0) {
        for (let s = 0; s < role.menu_masters[m].submenu_masters.length; s++) {
          if (m == index) {
            if (e.checked) {
              role.role_module_master_completed = true
              role.menu_masters[index].menu_completed = true
              role.menu_masters[index].submenu_masters[s].submenu_completed = true
            }
            else {
              role.menu_masters[index].menu_completed = false
              role.menu_masters[index].submenu_masters[s].submenu_completed = false
            }
          }

        }
      }
      else {
        if (m == index) {
          if (e.checked) {
            role.role_module_master_completed = true
            role.menu_masters[index].menu_completed = true
            role.menu_masters[index].role_module_master_completed = true
          }
          else {
            role.menu_masters[index].menu_completed = false
            role.menu_masters[index].role_module_master_completed = false
          }
        }
      }
    }


    let mains: any = []
    for (let k = 0; k < role.menu_masters.length; k++) {
      mains.push(role.menu_masters[k].menu_completed)
    }
    if (mains.includes(true)) {
      role.role_module_master_completed = true
    }
    else {
      role.role_module_master_completed = false
    }
    this.Main_Array[this.role_id] = role
  }
  changeSubModule(
    e: any,
    role: any,
    menu: any,
    submenue: any,
    submenue_id: any,
    menu_id: any,
    index: any,
    index_i: any,
    role_id: any,
    menuName: any,
  ) {
    this.role_id = role_id - 1

    let sub_menus: any = [];
    let sub_menus_all: any = [];
    let m_sb: any = []

    if (e.checked) {
      let data = {
        role_module_master_id: role_id,
        menu_master_id: menu_id,
        submenu_master_id: submenue_id,
        moduleName: menuName,
        forAll: false,
        forSingle: true,
        title: `Assign action of ${menuName} module`,
        role_id: this.user_id,
        // employee_id: this.user_id
      }
      this.openAssignActionPopup(data)
    }

    for (let m = 0; m < role.menu_masters.length; m++) {
      for (let s = 0; s < role.menu_masters[m].submenu_masters.length; s++) {
        m_sb = sub_menus_all
        if (m == index_i) {
          if (e.checked) {
            role.menu_masters[m].submenu_masters[index].submenu_completed = true
          }
          else {
            role.menu_masters[m].submenu_masters[index].submenu_completed = false
          }
          sub_menus.push(role.menu_masters[m].submenu_masters[s].submenu_completed);

        }
        sub_menus_all.push(role.menu_masters[m].submenu_masters[s].submenu_completed);

      }
    }
    if (sub_menus.includes(true)) {
      // role.role_module_master_completed = true
      role.menu_masters[index_i].menu_completed = true
    }
    else {
      role.menu_masters[index_i].menu_completed = false
    }
    if (sub_menus_all.includes(true)) {
      role.role_module_master_completed = true
    }
    else {
      role.role_module_master_completed = false
    }
    this.Main_Array[this.role_id] = role
  }

  roleIdData(e: any) {
    // this.selectFunctiona = true;
    // this.user_id = e
    // this.getMenu();
    // this.btnActive = true;
    // this._rbacMasterService.roleGetById(e).subscribe((res: any) => {
    //   this.roleGetBy = res.data;
    //   let moduledata = res.data;
    //   this.mdata = this.roleGetBy
    //   this.Main_Array = this.mdata
    // });

    this._rbacMasterService.employeGetByroleId(e).subscribe((res: any) => {
      this.roleGetByemployee = res.data;
    });
  };

  roleMenuAccessIdData(e: any) {
    this.selectFunctiona = true;
    this.user_id = e
    // this.getMenu();
    this.btnActive = true;
    this._rbacMasterService.roleGetById(e).subscribe((res: any) => {
      this.roleGetBy = res.data;
      let moduledata = res.data;
      this.mdata = this.roleGetBy
      this.Main_Array = this.mdata
    });
  };

  createRoleAssign(e: any) {

  }

  refresh() {
    window.location.reload();
  }

  openAssignActionPopup(data: any) {
    console.log(data, "data Popup Popup");

    const dialogRef = this.dialog.open(AssignActionPopupComponent, { width: '400px', disableClose: true, data: { ...data } });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  // accordionItem(e:any){
  //   console.log(e,'eeee vent');

  // }
}