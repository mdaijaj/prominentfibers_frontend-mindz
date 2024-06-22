import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ProductionService } from 'src/app/@shared/services/production/production.service';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';
import { ScheduleProductionActionComponent } from '../schedule-production/schedule-production-action/schedule-production-action.component';
import { TrackingActionsComponent } from './tracking-actions/tracking-actions.component';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';

@Component({
  selector: 'app-production-tracking',
  templateUrl: './production-tracking.component.html',
  styleUrls: ['./production-tracking.component.scss']
})
export class ProductionTrackingComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  rowData: any;
  public gridOptions: any = { rowSelection: 'multiple', };
  isDeleteButtonVisible: boolean = false;
  selectedRows: any[] = [];
  queryParamss: any;
  id: any;
  collegeids: any;
  collegeIdCopy: any;
  loginUser: any;
  assignAction: any;
  quickFilter: string;
  filteredData:any
  constructor(
    public dialog: MatDialog,
    private _configurationalMasterService: ConfigurationalmasterService,
    private _rbackService: RbacMasterService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private _productionService:ProductionService,
    private _empService: EmpRegistrationService,
  ) {
    this.rowClass = 'rowClass';
  }

signUpId:any
getAllVerifiedData:any[]=[]
getAllData:any[]=[];
filteredEmp:any[]=[]
ngOnInit(): void {
  this.getAllProductionData()
  this.getAllPlantMaster()
  this.getAllProduct()
  this._empService.grtEmployeeList().subscribe((res: any) => {
    this.getAllData=res.data;
    const empId=localStorage.getItem('signInUser')
    if(empId!=null)
    {
       const signupUser=JSON.parse(empId)
       this.signUpId=signupUser.employee_id; 
    }
  this.filteredEmp= this.getAllData.filter((res:any)=>{
      if(res.employee_id==  this.signUpId){
         return res;
      }
    })
     
    console.log(this.filteredEmp,'this.filteredEmp');
    this.getAllVerifiedData=this.filteredData.filter((res:any)=>{
     if(res.plantName==this.filteredEmp[0].reporting_plant_location){
      return res;
     }
   })
   
    

   
  })
 

 


}

  public columnDefs = [
    {
      headerName: 'S.No.',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:100 ,
    },
    
    {
      headerName: 'Product Name',
      field: 'product_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: 'grid-cell-centered',
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: 'Start Date',
      field: 'startDate',
      cellRenderer: '',
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    
   
    {
      headerName: 'End Date',
      field: 'endDate',
      cellRenderer: '',
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: '',
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    {
       headerName: 'Production QTY',
       field: 'productionQty',
       cellRenderer: '',
       cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        someProperty: 'value',
      },
      cellClass: "grid-cell-centered",
    },
    {
      headerName: 'Plant Name',
      field: 'plantName',
      cellRenderer: '',
      cellRendererParams: {
       className: 'mat-blue',
       hideRequestButton: true,
       sortable: true,
       hideDetailsButton: false,
       hideDownloadIcon: false,
       showCustomIcon: false,
       
       valueFormatter: 'JSON.parse(value)',
     },
     cellClass: "grid-cell-centered",
   },
    {
      headerName: 'Action',
      field: 'id',
      flex: 1,
      minWidth: 200,
      // minHeight:100,
      cellRenderer:TrackingActionsComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false, // Hide attachment icon
         
      },
    },
  ];

  

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  productionData:any
   
  getAllProductionData(){
    this._productionService.getAllVerifyData().subscribe((res:any)=>{
      this.rowData=res.data
      this.filteredData=this.rowData
     
    })




  }
  getAllPlantsData:any[]=[];
  getAllPlantMaster() {
    this._configurationalMasterService.getPlantMasterList().subscribe((res: any) => {
      this.getAllPlantsData = res.data;
    });
    
  }
  getAllProductData:any[]=[]
  getAllProduct(){
      this._configurationalMasterService.getProductMasterList().subscribe((res: any) => {
        this.getAllProductData = res.data
      }) 
      
  }
  
  onFilterByProductName(event:any) {
    if (event == null || undefined){
      this.getAllVerifiedData  =  this.filteredData;
    }else{
      this.getAllVerifiedData  = this.getAllVerifiedData.filter((res:any) => res.product_name == event);
    } 
  }



 

 



}
