import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ActionComponent } from 'src/app/@modules/lead/action/action.component';
import { AppListDialogComponent } from 'src/app/@shared/app-list-dialog/app-list-dialog.component';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';

@Component({
  selector: 'app-training-material-list',

  templateUrl: './training-material-list.component.html',
  styleUrls: ['./training-material-list.component.scss']
})

export class TrainingMaterialListComponent {
  private gridApi!: GridApi<any>;
  rowData:any;
  rowData2:any;
  rowData1:any;
  personalIdData:any;
  propertyManager:any
  text:any;
  firstLastName:any;
  rowClass: any;
  clicked: boolean = false;
  constructor(private emp_master:EmpMasterService,
    private toast: ToastrService,
    private empService : EmpRegistrationService,
    private recruitService: RecruitService,private head:HeadService,
    private leadService: LeadService, private route: Router,
    public dialog: MatDialog) {
      this.rowClass = 'rowClass'
     }

  ngOnInit(): void {
   
   this.head.clicked.subscribe(data=>{
    this.clicked = data;
  })
  this.leadService.getTrainingAuditor().subscribe((res:any) => {
    
    this.rowData = res.result;
  })  
    
  }

  public columnDefs = [
    {
      headerName: 'S.No',
      field: 'lead_genration_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Customer Type',
      field: 'customer_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Opportunity Ref No',
      field: 'OpportunityRef_no',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'BR Number',
      field: 'br_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Associated Company',
      field: 'associated_company',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Associated Contact Person',
      field: 'first_name',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
    },
    {
      headerName: 'DQS Contact Source',
      field: 'dqs_Contact_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Customer Sales Executive',
      field: 'customer_sales_executive',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:158,
    },
    {
      headerName: 'Opportunity Type',
      field: 'opportunity_type',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Product Request',
      field: 'product_request',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'State/Region',
      field: 'state_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Sales Person Name',
      field: 'contact_owner',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
    },
   
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      cellStyle: function (params: any) {
        if (params.value.toLowerCase() == 'Work Order Created'.toLowerCase()) {
          return { color: 'green' };
        }else if (params.value.toLowerCase() == 'Blocked Auditor'.toLowerCase()) {
          return { color: 'blue' };
        }else {
          return { color: 'orange' };
        }
      },
    },
    {
      headerName: 'Action',
      field: 'lead_genration_id',
      flex:1,
      minWidth:150,
      cellRenderer: ActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
      },
      cellClass: "grid-cell-centered"
    }
    

  ];

  TO_Pdf(){
   
      const dashboard = document.getElementById('dashboard');
      if (!dashboard) {
        console.error("Dashboard element not found");
        return;
      }
    
      const pdfWidth = dashboard.offsetWidth; 
      const pdfHeight = dashboard.offsetHeight; 
    
      const canvas = document.createElement('canvas');
      canvas.width = pdfWidth;
      canvas.height = pdfHeight;
    
      const context = canvas.getContext('2d');
      const capturePromise = html2canvas(dashboard, { canvas: canvas}, );
      
    
      capturePromise.then((canvas:any) => {
        
        const doc = new jsPDF(pdfWidth > pdfHeight ? 'landscape' : 'portrait', 'px', [pdfWidth, pdfHeight]);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight,
        );
        doc.save(` Offer-Latter.pdf`);
        this.toast.info('Please Attach Offer Latter with Mail..')
      }).catch((error:any) => {
        console.error("Error capturing dashboard content: ", error);
      });
      // this.dialog.close();
    }

  

  dateFormatter(createdAt: any) {
    return moment(createdAt).format('DD/MM/YYYY');
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

  }
  onCellClicked(e:any){
    
    const dialogRef = this.dialog.open(AppListDialogComponent,{width:'500px',data:{lead_id:e.data.lead_genration_id}});
      dialogRef.afterClosed().subscribe(result => {
        
      })
  }
}