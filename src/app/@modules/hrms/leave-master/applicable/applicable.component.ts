import { Component, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-applicable',
  templateUrl: './applicable.component.html',
  styleUrls: ['./applicable.component.scss']
})
export class ApplicableComponent {
  @ViewChild('select') select: MatSelect;
  @ViewChild('roleSelect') roleSelect: MatSelect;
  @ViewChild('empSelect') empSelect: MatSelect;

  allDepartmentSelected=false;
  allRoleSelected=false;
  allEmpSelected=false;

  toggleAllDepSelection() {
    if (this.allDepartmentSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
   depOptionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allDepartmentSelected = newStatus;
  }

  toggleAllRoleSelection() {
    if (this.allRoleSelected) {
      this.roleSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.roleSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }
   roleOptionClick() {
    let newStatus = true;
    this.roleSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allRoleSelected = newStatus;
  }

  toggleAllEmpSelection() {
    if (this.allEmpSelected) {
      this.empSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.empSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }
   empOptionClick() {
    let newStatus = true;
    this.empSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allEmpSelected = newStatus;
  }
}
