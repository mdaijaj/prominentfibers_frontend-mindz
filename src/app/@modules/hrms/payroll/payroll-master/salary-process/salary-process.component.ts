import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary-process',
  templateUrl: './salary-process.component.html',
  styleUrls: ['./salary-process.component.scss']
})
export class SalaryProcessComponent {
constructor(private route:Router){}

ngOnInit() {

}

onCancel(path:any) {
  this.route.navigate([path])
  }
}
