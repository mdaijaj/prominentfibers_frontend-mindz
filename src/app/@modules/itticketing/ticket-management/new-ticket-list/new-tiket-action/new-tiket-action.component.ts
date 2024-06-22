import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NewTicketDialogComponent } from '../new-ticket-dialog/new-ticket-dialog.component'; 

@Component({
  selector: 'app-new-tiket-action',
  templateUrl: './new-tiket-action.component.html',
  styleUrls: ['./new-tiket-action.component.scss']
})
export class NewTiketActionComponent {
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
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    

    return params.valueFormatted ? params.valueFormatted : params.data.itTicketing_number
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  edit(){
    this.router.navigate(["master/itticket/ticket-management/new-ticket-list"],{queryParams:{itTicketing_number:this.cellValue}})
  }
  viewDialog(e:any){


  }
  openDialog() {

    const dialogRef
      = this.dialog.open(NewTicketDialogComponent, {
        // width: '100%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        // panelClass: 'full-screen-modal',
        data: { itTicketing_number: this.cellValue }
        
      });
      
    dialogRef.afterClosed().subscribe(result => {
      
    });
    
    
  }
}
