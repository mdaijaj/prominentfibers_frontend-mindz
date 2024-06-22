import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { warehouseListService } from 'src/app/@shared/services/warehouse/warehouse-list.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.scss']
})
export class WarehouseCreateComponent {

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

  parm: any;
  id : any;
  getData : any;
  constructor(
    private $warehouseList: warehouseListService,
    private toast: ToastrService,
    private router: Router,
    private activetedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    
    this.activetedRoute.queryParams.subscribe((params: any) => {
      this.parm = params;
      this.id = params.id;
    })

    this.getWarehouseById();

    this.selectedValue = '';
    this.getPlantList();
    let lg: any = localStorage.getItem('signInUser')
    this.loginUser = JSON.parse(lg);
    let role: any = this.loginUser.role;
    this.getRolesList(role);
  }


  getWarehouseById(){
    try {
      this.$warehouseList.getWarehouseById(this.id).subscribe((response: any) => {
        if (response) {
          this.getData = response.data;
          this.name = this.getData.name;
          this.selectedPlant = this.getData.plant_id;
          this.selectedRole = this.getData.role_id;
          this.selectedEmployee = this.getData.employee_id;
          this.contactNo = this.getData.contact_no;
          this.email = this.getData.email;
          this.altEmail = this.getData.alt_email;
          this.getEmployeesList(this.selectedRole);
        }
      }, (err: any) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

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

  save(){
    let body = {
      "id":this.id,
      "name":this.name,
      "plant_id": this.selectedPlant,
      "role_id" : this.selectedRole,
      "employee_id":this.selectedEmployee,
      "contact_no": this.contactNo,
      "email":this.email,
      "alt_email": this.altEmail
    }

    try {
      this.$warehouseList.editWarehouse(body).subscribe((response: any) => {
        if (response) {
          this.addResponse = response.data;
          this.toast.success('Warehouse Edited', 'Warehouse edition successful');
          this.router.navigate(["master/warehouse-management/warehouse-list/warehouse-list"]);
        }
      }, (err: any) => {
        this.toast.error('Something went wrong', 'Something went wrong');
        console.log(err);
      })
    } catch (error) {
      this.toast.error('Something went wrong', 'Something went wrong');
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


