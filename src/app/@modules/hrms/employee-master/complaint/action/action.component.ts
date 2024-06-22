import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {ComplaintDialogComponent} from '../complaint-list/complaint-dialog/complaint-dialog.component'
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  employee_complaint_id: any;

  constructor(private route: Router, private recruitservice : RecruitService ,
    public dialog: MatDialog, private toast: ToastrService, private recruitService: RecruitService) {
  }

  ngOnInit(): void {
    
    
  }
  public cellValue: any;


  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }

  getValueToDisplay(params: ICellRendererParams) {
    
    return params.data.employee_complaint_id;
  }
  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  
  edit(e:any) {
    e.stopPropagation();
    // 
    this.route.navigate(['hrms/employee-master/complaint-create'], { queryParams: { complaintId: this.cellValue } })
    // edit(e: any) {
    //   e.stopPropagation();
    // }
  }

  delete(e:any){
    
    const data = {
      employee_complaint_id: this.cellValue
    }
    this.employee_complaint_id = Number(this.cellValue)
    this.recruitService.deleteComplaint(this.employee_complaint_id).subscribe((res:any)=>{
      
      this.toast.success('Complaint Deleted successfully!');
      window.location.reload();
    })
    e.stopPropagation();

    
  }



  openDialog() {
    const dialogRef
      = this.dialog.open(ComplaintDialogComponent, {
        // width: '100%',
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // height: '100%',
        // panelClass: 'full-screen-modal',
        data: { id: this.cellValue }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }



}
