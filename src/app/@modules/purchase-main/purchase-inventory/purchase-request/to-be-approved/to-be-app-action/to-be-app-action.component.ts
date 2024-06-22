import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToBeAppDilogComponent } from '../to-be-app-dilog/to-be-app-dilog.component';


@Component({
  selector: 'app-to-be-app-action',
  templateUrl: './to-be-app-action.component.html',
  styleUrls: ['./to-be-app-action.component.scss']
})
export class ToBeAppActionComponent {
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router
  ) {
    // this.data = localStorage.getItem("jobId");
    // 
    
  }

  ngOnInit(): void {}
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = params
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  onCellClicked(e:any){
    
    e.stopPropagation()
    const dialogRef = this.dialog.open(ToBeAppDilogComponent, { width: '500px', data: { cellData: this.cellValue.data} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  proceedToApp(e:any) {
    e.stopPropagation();
    
    this.router.navigate(['master/purchase-main/purchase-request/to-be-approved/approved-pr'], { queryParams: { pr_id: this.cellValue.data.procurement_id, status:this.cellValue.data?.PR_category}})
  }
}
