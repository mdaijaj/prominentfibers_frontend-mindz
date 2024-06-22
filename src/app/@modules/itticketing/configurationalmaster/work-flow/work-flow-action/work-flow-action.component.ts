import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ViewWorkFlowComponent } from '../view-work-flow/view-work-flow.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-work-flow-action',
  templateUrl: './work-flow-action.component.html',
  styleUrls: ['./work-flow-action.component.scss']
})
export class WorkFlowActionComponent implements OnInit {
  cellValue:any;
constructor(private router:Router,public dialog: MatDialog,){}

ngOnInit(): void {
  
}

agInit(params: ICellRendererParams): void {
  this.cellValue = this.getValueToDisplay(params);
}

getValueToDisplay(params: ICellRendererParams) {
  return params.valueFormatted ? params.valueFormatted : params.data.workflow_id;
}

refresh(params: ICellRendererParams): boolean {
  this.cellValue = this.getValueToDisplay(params);
  return true;
}

editWorklow(event:any){
   event.stopPropagation();
    this.router.navigate(['master/configurational-master/workflow/add-work-flow'], {
      queryParams: { id: this.cellValue },
    });
}
openDialog() {
  const dialogRef = this.dialog.open(ViewWorkFlowComponent, {
    data: { id: this.cellValue },

    width: '40%',
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    
  });
  
}
}
