import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
// import { QuotationDownloadActionComponent } from '../../rfp/live-rfp/quotation-download-action/quotation-download-action.component';
import { ApproveProcessRemarkComponent } from '../approve-process-remark/approve-process-remark.component';
import { AgGridAngular } from 'ag-grid-angular';
import { DataUpdateService } from 'src/app/@shared/services/data-update.service';
import { QuotationDownloadActionComponent } from '../../rfp/live-rfp/quotation-download-action/quotation-download-action.component';

@Component({
  selector: 'app-approve-process',
  templateUrl: './approve-process.component.html',
  styleUrls: ['./approve-process.component.scss'],
  providers: [ApproveProcessComponent]
})
export class ApproveProcessComponent implements OnInit, AfterViewInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @ViewChild('checkboxContainer', { static: false }) checkBoxContainer: ElementRef;

  createPrForm: FormGroup;
  remarkForm: FormGroup;
  imageToUpload: any;
  imagePath: any;
  editDocData: any;
  vendorData: any;
  noOfVendor: any;
  id: any;
  singlePrData: any;
  sendRfpData: any;
  endData: any;
  rfpForm: FormGroup;
  private gridApi!: GridApi<any>;
  rowClass: any;
  quotationStatus: boolean = false;
  // checkBoxStates:any={}
  selectedCheckbox = null;
  selectedRow: any;
  gridColumnApi: any;
  frameWorkComponents: any;
  // columnDefs:any[];
  gridOptions: any;
  disableReject:boolean


  constructor(private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog, private fb: FormBuilder,
    private prService: PurchaseRequestService,
    private configurationalMasterService: ConfigurationalmasterService,
    private updateTableData:DataUpdateService
  ) {
    this.createPrForm = this.fb.group({
      name: new FormControl(null),
      department: new FormControl(null),
      emp_id: new FormControl(null),
      alldata: new FormArray([]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
      invite_no_vendor: new FormControl(null, [Validators.required]),
      delivery_address: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
      vendors: new FormControl(null, [Validators.required]),
    });

    this.remarkForm = this.fb.group({
      remarks_approvel: new FormControl(null, [Validators.required]),
    })
    this.frameWorkComponents = {
      QuotationDownloadAction: QuotationDownloadActionComponent
    }

  }

  ngOnInit(): void {
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params.pr_id;
      this.quotationStatus = params.isRejected
      
    });
    this.setAllQuotationDetails()
    this.getAllQuotationDetails()

    this.configurationalMasterService
      .getVendorType()
      .subscribe((params: any) => {
        this.vendorData = params.data;
        
      });

    if (this.id) {
      this.prService.getByIdPR(this.id).subscribe((res: any) => {
        

        this.singlePrData = res.data;
        this.CF_1['file'].setErrors(null);
        
        this.endData = moment(new Date(this.singlePrData.end_date)).format('LL');
        <FormArray>this.CF_1.alldata.push(
          new FormGroup({
            product_image: new FormControl(this.singlePrData?.product_image),
            item_name: new FormControl(this.singlePrData?.item_name),
            item_code: new FormControl(this.singlePrData?.item_code),
            unit: new FormControl(this.singlePrData?.unit),
            priority: new FormControl(this.singlePrData?.priority),
            mvp: new FormControl(this.singlePrData?.mvp),
          })
        );

        this.createPrForm.patchValue({
          location: this.singlePrData?.location,
          state: this.singlePrData?.state,
          pin: this.singlePrData?.pin,
          city: this.singlePrData?.city,
          delivery_address: this.singlePrData?.delivery_address,
        });
      });
    }
  }


  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'i',
      valueGetter: "node.rowIndex + 1",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Vendors',
      field: 'vendor_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    // {
    //   headerName: 'Level',
    //   field: 'level',
    //   sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   cellClass: "grid-cell-centered",
    //   valueFormatter: 'JSON.parse(value)',
    //   flex: 1,
    //   minWidth: 150,
    // },
    {
      headerName: 'Price',
      field: 'price_amt',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'SGST',
      field: 'sgst',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'CGST',
      field: 'cgst',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Igst',
      field: 'igst',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Delivery Charges',
      field: 'delivery_charges',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Additional Charges',
      field: 'additional_charges',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Remark',
      field: 'vendor_remarks',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      valueFormatter: 'JSON.parse(value)',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: 'Actions',
      field: 'vendor_uploaded_document', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex: 1,
      minWidth: 150,
      cellRenderer: QuotationDownloadActionComponent,
      cellRendererParams: {
        className: 'mat-blue',
        hideRequestButton: true,
        hideDetailsButton: false,
        hideDownloadIcon: false,
        showCustomIcon: false,
        parantComponent: this
      },
      cellClass: "grid-cell-centered",

    },
    // {
    //   headerName: 'checkbox',
    //   field: 'checked', sortable: true,
    //   resizable: true,
    //   wrapHeaderText: true,
    //   autoHeaderHeight: true,
    //   flex: 1,
    //   minWidth: 150,
    //   cellRenderer: (params: any) => {
    //     let checkid;

    //     setTimeout(() => {
    //       let checkbox_1 = document.querySelectorAll('.checkbox_1')
    //       if (checkbox_1.length !== 0) {
    //         for (let i = 0; i < checkbox_1.length; i++) {
    //           // checkbox_1[i].setAttribute('disabled','true')
    //           checkbox_1[i].addEventListener('change', (event:any) => {
    //             let id = checkbox_1[i].getAttribute('data-id')
    //             checkid = id
    //             if(id){

    //               console.log(id, event.target.checked);
    //               // call api 

    //             }
    //           })
    //         }
    //       }
    //     }, 200)
    //     return `
    //       <input type="checkbox"  ${!params.data.checked ? 'disabled': ''} data-id="${params.data.vendors}" class="checkbox_1"
    //       >
    //     `;
    //   },
    //   cellClass: "grid-cell-centered",

    // },

  ];

  // checkBox(e: any) {
  //   return `
  //   <input type="checkbox"(change)="onCheckboxClick($event)"
  //   >
  // `;
  // }


  public rowData: any;


  get CF_1(): any {
    return this.createPrForm.controls;
  }


  deleteRow(i: number) {
    <FormArray>this.CF_1.alldata.removeAt(i);
  }

  onChange(e: any) {
    

    if (e.target.files && e.target.files[0]) {
      const data: FileList = e.target.files;
      this.imageToUpload = data.item(0) || null;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
        

      };
      reader.readAsDataURL(this.imageToUpload);
    }
    
  }


  seePreview(path: string, imagePath: any) {
    if (!this.imagePath) {
      if (path) {
        Swal.fire({
          imageUrl: path,
          imageHeight: 250,
          imageAlt: 'Uploaded Document',
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

  onVendorChange(e: any) {
    this.noOfVendor = e.value;
    
    this.createPrForm.controls['invite_no_vendor'].patchValue(this.noOfVendor.length)

  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
  }

  statusCellClicked(e: any) {
    // console.log(e, "xcvxvxvcx");
  }

  getAllQuotationDetails(){
    this.updateTableData.getTabledata().subscribe((res:any)=>{
    this.rowData= res.data;
    })
  }
  setAllQuotationDetails(){
    this.prService.getAllQuotationDetails(this.id).subscribe((res:any)=>{
      const rowData = res;
      this.updateTableData.setTableData(rowData)
      })
  }

  // getAllQuotationDetails() {
  //   this.prService.getAllQuotationDetails(this.id).subscribe((res: any) => {
  //     this.rowData = res.data;
  //   })
  // }

  OpenRemarkModal(e: any, status: any) {
    let productId :any
    if(this.rowData){
      this.rowData.forEach((res:any) => {
        if(res.checked === true){
          productId = res.vendor_product_details_id
        }
      });
    }
    const dialogRef = this.dialog.open(ApproveProcessRemarkComponent, { width: '500px', data: { status: status, id: this.id,productId:productId } });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }



  OnfirstDataRendered(event: any) {
    event.api.sizeColumnsToFit()
  }

  ngAfterViewInit(): void {
    // this.agGrid.api.sizeColumnsToFit()
  }

  getContextMenuItems(params: any) {
    params.context.parentComponent = this;
    return params.context.parentComponent;
  }



  isRowSelected(row: any): boolean {
    return row === this.selectedRow;
  }


 checkAvailability() {
    return this.rowData.some((res:any) => res.checked === true);
  }


}
