import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import {
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItticketingService } from 'src/app/@shared/services/itticketing.service';
import { NewTiketActionComponent } from './new-tiket-action/new-tiket-action.component';
import { NewTicketDialogComponent } from './new-ticket-dialog/new-ticket-dialog.component';

@Component({
  selector: 'app-new-ticket-list',
  templateUrl: './new-ticket-list.component.html',
  styleUrls: ['./new-ticket-list.component.scss']
})
export class NewTicketListComponent implements OnInit {
  @ViewChild('editer') editer: any;
  imageDefult: any = '../../../../../../assets/icons/icon_DQS/user.png';
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  itForm: FormGroup;
  itTicketing_number: any;
  parm: any;
  getData: any;
  attachementFile: any;
  fileAtt: any;
  singleTicketData: void;
  loginUserID: string | null;
  hide: any;
  show:any;
  userLoginData: any;
  loginUserName: any;
  GetAllUserNameDropDown: any;
  asignTo: any;
  imagePath: any;
  ticketData: any;
  strippedString:any;
  hide_remark_status:boolean=true;
  key:any;
  isother:boolean=true;
  status: any;
  e: any;
  value: any;
  statusChange: any;
  getStatus: any;

  ngOnInit(): void {
    this.loginUserID = localStorage.getItem('EmpMainId');
    
    this.activetedRoute.queryParams.subscribe(params => {
      for(this.key in params){ 
      }

      this.parm = params;
      this.itTicketing_number = this.parm.itTicketing_number;
      
    })
    if (this.itTicketing_number) {
      this.getByIdItticketing();
    }
    this.getLoginUserData();
    this.getByIduser();
    this.getUserNameDropDown();
  }
  back() {
    history.back();
  }
  change(e: any) {
    console.log(e,"e");
    
    if (e.value == "Other") {
      this.hide = e.value
    }
    else if (e.value == "Self") {
      

      this.itForm.controls['others_name'].setValue(this.loginUserName);
      this.hide = e.value
    }
  }
  onstatuschange(e:any){
    
    this.statusChange=e.value
  }
  onFileChange(event: any) {
    
    let fileAttachment: FileList = event.target.files[0];
    this.fileAtt = fileAttachment
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePath = e.target.result;
    };
    reader.readAsDataURL(this.fileAtt);

  }

  constructor(public dialog: MatDialog,
    private fb: FormBuilder, private toast: ToastrService,
    private router: Router, private activeroute: ActivatedRoute,
    private _itTicketingService: ItticketingService,
    private activetedRoute: ActivatedRoute) {
    this.rowClass = 'rowClass'

    this.itForm = this.fb.group({
      ticket_raised_by: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      others_name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      stage: new FormControl(null, [Validators.required]),
      subject: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      attachment: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required]),
      ticket_assigned_to: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    })
  }

  getByIdItticketing() {
    this._itTicketingService.getByIdItticketing(this.itTicketing_number).subscribe((res: any) => {
      this.ticketData = res.data;
      
      this.basicFormPatch(this.ticketData);
    })
  }

  basicFormPatch(ticketData: any) {
    
    

    let data:any = {
      ticket_raised_by: ticketData?.ticket_raised_by,
      others_name: ticketData?.others_name,
      category: ticketData?.category,
      stage: ticketData?.stage,
      description: ticketData?.description,
      subject: ticketData?.subject, 
      employee_id: ticketData?.employee_id,
      ticket_assigned_to: ticketData?.ticket_assigned_to,
      status: ticketData?.status,
      
    }
    if(ticketData?.remarks){
      data.remarks= ticketData?.remarks
    }
    this.singleTicketData = this.itForm.patchValue(data)
    
   
    this.getStatus=this.itForm.get('status')?.value;
    this.statusChange=this.getStatus;
    
  }

  sumbit() {
    if (this.itForm.invalid) {
      this.toast.error("Required fields should not be empty", "Fields Error")
      
      return;
    }
    this.attachementFile = this.itForm.value.attachment
    
    
    if (this.itForm.value.description) {
      this.strippedString = this.itForm.value.description.replace(/(<([^>]+)>)/gi, '').trim();

    }
    
    const data = {
      ticket_raised_by: this.itForm.value?.ticket_raised_by,
      others_name: this.itForm.value?.others_name,
      category: this.itForm.value?.category,
      stage: this.itForm.value?.stage,
      subject: this.itForm.value?.subject,
      description: this.strippedString,
      // remarks: this.itForm.value?.remarks,
      employee_id: this.loginUserID,
      ticket_assigned_to: this.itForm.value?.ticket_assigned_to,
      status: this.itForm.value?.status
    }
    

    

    this._itTicketingService.CreateItticketing(data, this.fileAtt).subscribe((res: any) => {
      
      this.toast.success(res.message);
      this.router.navigate(['master/itticket/ticket-management/Ticket-content']);
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong!');
        } else {
          this.toast.error('Error in submission!');
        }
      }
    )
  }


  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Profile Image',
          confirmButtonColor: "#8B817D",
          confirmButtonText: 'Ok',
        })
      }
    } else {
      Swal.fire({
        imageUrl: imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  };

  reLoad() {
    history.back();
  }
  onUpdateForm() {
    if (this.itForm.value.description) {
      this.strippedString = this.itForm.value.description.replace(/(<([^>]+)>)/gi, '').trim();

    }
    const data = {
      ticket_raised_by: this.itForm.value?.ticket_raised_by,
      others_name: this.itForm.value?.others_name,
      category: this.itForm.value?.category,
      stage: this.itForm.value?.stage,
      subject: this.itForm.value?.subject,
      description: this.strippedString,
      remarks: this.itForm.value?.remarks,
      employee_id: this.loginUserID,
      ticket_assigned_to: this.itForm.value?.ticket_assigned_to,
      status: this.statusChange
    }
    
    
    
    this._itTicketingService.updateItticketing(this.itTicketing_number, data, this.fileAtt).subscribe((res: any) => {
      // this.update=res
      
      this.toast.success("Ticket Apply Updated successfully..")
      const latlang = { id: this.itTicketing_number };
      this.router.navigate(['master/itticket/ticket-management/Ticket-content'], { queryParams: latlang });
    })
  }

  public columnDefs = [
    {
      headerName: 'S.NO',
      field: 'employee_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueGetter: 'node.rowIndex+1',
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Ticket No.',
      field: 'itTicketing_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Raised By',
      field: 'ticket_raised_by',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Category',
      field: 'category',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Subject',
      field: 'subject',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Created date',
      field: 'createdAt',
      valueFormatter: this.dateFormatter,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      // cellRenderer: (params: any) => params.value == 0 ? "Close" : "Open",
      // cellStyle: (params: any) => {
      //   if (params.value === 0) {
      //     return { color: 'red', fontSize: '16px' };
      //   }
      //   else{
      //     return { color: 'green', fontSize: '16px' };
      //   }
      //   return null;
      // }
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Open'.toLowerCase()) {
          return { color: 'green' };
        } else if (params.value.toLowerCase() == 'In-Progress'.toLowerCase()) {
          return { color: 'blue' };
        } else if (params.value.toLowerCase() == 'Close'.toLowerCase()) {
          return { color: 'red' };
        } else {
          return { color: 'blue' };
        }
      },
    },

    {
      headerName: 'Action',
      field: 'employee_id',
      flex: 1,
      minWidth: 150,
      cellRenderer: NewTiketActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
    }
  ];
  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onPageSizeChanged() {
    var value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onCellClicked(e: any) {
    
    const dialogRef = this.dialog.open(NewTicketDialogComponent,
      {
        width: '400px',
        data: {
          itTicketing_number: e.data.itTicketing_number
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  getLoginUserData() {
    this._itTicketingService.get_logIn_Admin_name(this.loginUserID)
      .subscribe((res: any) => {
        this.userLoginData = res
        
        this.loginUserName = this.userLoginData.data.first_name
        
      })
  }

  getByIduser() {
    this._itTicketingService.getByIduser(this.loginUserID).subscribe((res: any) => {
      this.rowData = res.data;
      
    })
  }

  getUserNameDropDown() {
    this._itTicketingService.getUserNameDropDown()
      .subscribe((res: any) => {
        this.GetAllUserNameDropDown = res.data
        this.asignTo = res.data
        console.log(this.GetAllUserNameDropDown,'getAllUserName');
        
      }
      )

  }
  changes(){
    console.log("check");
    
  }
}
