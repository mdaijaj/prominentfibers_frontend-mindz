import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import Swal from 'sweetalert2';
export interface MyCellParam {
  buttonText?: string;
  buttonText1?: string;
}
@Component({
  selector: 'app-my-pending-action',
  templateUrl: './my-pending-action.component.html',
  styleUrls: ['./my-pending-action.component.scss']
})
export class MyPendingActionComponent implements OnInit{


  cellValue:any
  paramsVal:any;
  constructor(private route:Router, 
    private toaster:ToastrService, 
    private _recrutmentService:RecruitService){
  }
  ngOnInit(): void {
  }

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  
  agInit(params: ICellRendererParams): void {
    this.paramsVal = params.data;
    
    this.cellValue = this.getValueToDisplay(params);
    
  }

  getValueToDisplay(params: ICellRendererParams) {
    
    return params.data.candidate_id;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }
  approve(e: any) {
    e.stopPropagation();

      Swal.fire({
        title: 'Have you reviewed this candidate completely ?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: "#f44336",
        confirmButtonColor: "#3f51b5",
        confirmButtonText: 'Yes',
        cancelButtonText: 'Not Now'
      }).then((result) => {
        if (result.isConfirmed) {
          const data: any = {
            status: 'Reviewed'
          };
          this._recrutmentService.update_status(this.paramsVal.candidate_id, data).subscribe(
            (res) => {
              
              this.toaster.success(`${this.paramsVal.condidate_name} has been Reviewed by ${this.paramsVal.assigned_hiring_manager}, Go and fixed the interview`, "Reviewed successfully")
              this.reloadCurrentRoute();
            }, (err) => {
              
              this.toaster.error('Something went wrong please try again', "Error Message")
            }
          )
        }
      });
  }

  reject(e: any, appro: boolean) {
    e.stopPropagation();

    let data: any = {
      approve_status: appro
    }
    
  }

  approvedOrNot(id: any, data: any) {

  }
}
