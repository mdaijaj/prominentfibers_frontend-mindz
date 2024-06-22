import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { AllPrDilogComponent } from '../all-pr-dilog/all-pr-dilog.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-all-pr-action',
  templateUrl: './all-pr-action.component.html',
  styleUrls: ['./all-pr-action.component.scss']
})
export class AllPrActionComponent implements OnInit, AfterViewInit {
  public cellValue: any;
  assignAction: any;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private router:Router,
    private _rbackService:RbacMasterService,
  ) {
    // this.data = localStorage.getItem("jobId");
    // 
    
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },0);
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    

    return params.valueFormatted ? params.valueFormatted : params.data
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    
    
    return true;
  }

  onCellClicked(e:any){
    
    e.stopPropagation()
    const dialogRef = this.dialog.open(AllPrDilogComponent, { width: '500px', data: { cellData: this.cellValue} });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  edit(e:any) {
    e.stopPropagation();
    
    
    // 
    this.router.navigate(['master/itticket/purchase-inventory/purchase-request/all-pr-list/create-pr'], { queryParams: { pr_id: this.cellValue.procurement_id }})
  }
  
}
