import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';

@Component({
  selector: 'app-add-emp-in-payroll',
  templateUrl: './add-emp-in-payroll.component.html',
  styleUrls: ['./add-emp-in-payroll.component.scss']
})
export class AddEmpInPayrollComponent implements OnInit {
  edited_ID: any;
  active: boolean = false;
  id: any;
  constructor(private ngZone: NgZone, private router: Router, private _empService: EmpRegistrationService, private activeroute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this._empService.getEmpId().subscribe(
      (res: any) => {
        this.edited_ID = res
      })
    this.activeroute.queryParams.subscribe(params => {
      console.log(params, "goToBasicDgetails3")
      this.edited_ID = params['employee_id']
      if (this.edited_ID) {
        this.active = true
      }

    })
  }

  goTo(path: any) {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => {
        this.router.navigate([`${path}`], { queryParams: { employee_id: this.edited_ID } });
      });
    })
  }
}
