import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addhouse',
  templateUrl: './addhouse.component.html',
  styleUrls: ['./addhouse.component.css'],
})
export class addhouseComponent {
  masterList: any;
  rolesList:any;
  employeesList:any;
  loginUser: any;
  selectedValue: any;

  selectedPlant: any;
  selectedRole: any;
  selectedRoleName: any;
  selectedEmployee: any;
  selectedEmployeeName: any;
  valueName: any;
  name:any;
  contactNo: any;
  email: any;
  altEmail : any;
  addResponse : any;
  constructor(
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
    private router: Router
  ) {}

    // Get plant list
  getPlantList() {
    try {
      this.$warehouseList.getAllPlants().subscribe((response: any) => {
        if (response) {
          this.masterList = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  getRolesList(role_id: any) {
    try {
      this.$warehouseList.getAllRolesByName(role_id).subscribe((response: any) => {
        if (response) {
          this.rolesList = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  getEmployeesList(role_id: any) {
    try {
      this.$warehouseList.getAllEmployeesByRole(role_id).subscribe((response: any) => {
        if (response) {
          this.employeesList = response.data;
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit() {
    this.selectedValue = '';
    this.getPlantList();
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    let role: any = this.loginUser.role;
    this.getRolesList(role);
  }
  save(){
    let body = {
      "name":this.name,
      "plant_id": this.selectedPlant,
      "role_id" : this.selectedRole,
      "employee_id":this.selectedEmployee,
      "contact_no": this.contactNo,
      "email":this.email,
      "alt_email": this.altEmail
    }

    try {
      this.$warehouseList.createWarehouse(body).subscribe((response: any) => {
        if (response) {
          this.addResponse = response.data;
          this.toast.success('Warehouse Created', 'Warehouse creation successful');
          this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  cancel(){
    this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
  }

  onSelectedRole(event: any) {
    this.getEmployeesList(this.selectedRole);
  }
}

