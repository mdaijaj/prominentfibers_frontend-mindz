import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-outward-action',
  templateUrl: './outward-action.component.html',
  styleUrls: ['./outward-action.component.scss']
})
export class OutwardActionComponent {
  cellValue: any;
  userRole: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    let lg: any = localStorage.getItem('signInUser');
    let loginUser = JSON.parse(lg);
    console.log('loginUser', loginUser);
    this.userRole= loginUser.role;
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.valueFormatted ? params.valueFormatted : params.data.courier_Outward_id;
  }

  edit(e:any){
    e.stopPropagation();
    this.route.navigate(['/master/admin-support/courier-outward/create-outward'],
      { queryParams: { id: this.cellValue}})
  }
}
