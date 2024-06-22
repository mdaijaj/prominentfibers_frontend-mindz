import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { DMSService } from 'src/app/@shared/services/dms.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { AchievementDialogComponent } from '../../../employee-master/achievement-list/achievement-dialog/achievement-dialog.component';
import { EmpListDialogComponent } from '../../../employee-master/employee/employee-list/emp-list-dialog/emp-list-dialog.component';
import { DMSDialogComponent } from '../dms-dialog/dms-dialog.component';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  docID:any
  getFormData:any
  downloadData:any
  achieveId: any;
  assignAction:any;

  constructor(private route: Router, 
    private recruitservice : RecruitService ,
   private _dmsService:DMSService,
   private _rbackService:RbacMasterService,
    public dialog: MatDialog, private toast: ToastrService, private recruitService: RecruitService) {
  }

  ngOnInit(): void {
    this.assignAction = this._rbackService.accessAssignAction();
    // this.downloadAll();
    
  }
  public cellValue: any;

  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
    
  }
  getValueToDisplay(params: ICellRendererParams) {
    
    return params.data.document_master_id;
  }

  refresh(params: ICellRendererParams): boolean {
    // set value into cell again
    
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  edit(e:any) {
    e.stopPropagation();
    
    // 
    this.route.navigate(['master/hrms/DMS/dataManagement/editFolder'], 
    { queryParams: { document_master_id: this.cellValue }}  
    )

       // 
      //  if (this.docID) {
      //   this.route.navigate(['master/hrms/DMS/dataManagement/editFolder'],
      //    { queryParams: { document_master_id: this.cellValue } })
      // }
    // 
    
    // edit(e: any) {
    //   e.stopPropagation();
    // }
    this._dmsService.getFolderFormData().subscribe(
      (res:any)=>
      {
        this.getFormData=res;
        
      })
  }

  delete(e:any){
    // 
    // const data = {
    //   achieveId: this.cellValue
    // }
    // this.achieveId = Number(this.cellValue)
    // this.recruitService.deleteAchievement(this.achieveId, data).subscribe((res:any)=>{
    //   
    //   this.toast.success("Achievement Deleted successfully..");
    //   window.location.reload();
    // })
    // e.stopPropagation();

    
  }
  openDialog() {
    const dialogRef
      = this.dialog.open(DMSDialogComponent, {
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
  // downloadAll(val:any){
  //   val.stopPropagation();
  //   
  //   this._dmsService.downloadbyID(this.cellValue).subscribe(res=>{
  // this.downloadData=res;
  // 
  //     }
  //   )
  // 
  // }
}
