import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import Swal from 'sweetalert2';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { QuotationDownloadActionComponent } from '../quotation-download-action/quotation-download-action.component';
import { QuotationDefineDateComponent } from '../quotation-define-date/quotation-define-date.component';


@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss']
})

export class QuotationDetailsComponent {
  createPrForm: FormGroup;
  remarkForm:FormGroup;
  imageToUpload: any;
  imagePath: any;
  editDocData:any;
  vendorData: any;
  noOfVendor: any;
  id: any;
  singlePrData: any;
  sendRfpData: any;
  endData: any;
  rfpForm:FormGroup;
  private gridApi!: GridApi<any>;
  rowClass: any;

  constructor(  private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute,
    public dialog: MatDialog, private fb:FormBuilder, private prService: PurchaseRequestService, private configurationalMasterService: ConfigurationalmasterService) {
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
        vendors :new FormControl(null, [Validators.required]),
      });

      this.remarkForm = this.fb.group({
        remarks_approvel: new FormControl(null, [Validators.required]),
      })

     }

     ngOnInit(): void {
      this.activeroute.queryParams.subscribe((params: any) => {
        this.id = params.pr_id;
       
      });
      this.getAllQuotationDetails()

      this.configurationalMasterService
      .getVendorType()
      .subscribe((params: any) => {
        this.vendorData = params.data;
        
      });

      if (this.id) {
        this.prService.getByIdPR(this.id).subscribe((res: any) => {
          this.singlePrData = res.data;
          // this.singlePrData.vendors[0];
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

     public rowData:any;

public columnDefs = [
  {
    headerName: 'Sr No.',
    valueGetter: "node.rowIndex + 1",
    sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    cellClass: "grid-cell-centered",
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
  //   flex:1,
  //   minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
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
    flex:1,
    minWidth:150,
  },
  {
    headerName: 'Actions',
    field: 'vendor_uploaded_document', sortable: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    flex:1,
    minWidth:150,
    cellRenderer: QuotationDownloadActionComponent,
    cellRendererParams: {
      className: 'mat-blue',
      hideRequestButton: true,
      hideDetailsButton: false,
      hideDownloadIcon: false,
      showCustomIcon: false, 
    },
    cellClass: "grid-cell-centered",
   
  },
  
];

     get CF_1(): any {
      return this.createPrForm.controls;
    }
  
  
    deleteRow(i: number){
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

    onVendorChange(e:any){
     this.noOfVendor = e.value;
     
     this.createPrForm.controls['invite_no_vendor'].patchValue(this.noOfVendor.length)
    
    }


    onGridReady(params: GridReadyEvent) {
      this.gridApi = params.api;
      
    }

    statusCellClicked(e:any){
      
      // const dialogRef = this.dialog.open(PrStatusDilogComponent, { width: '450px', data: { cellData: e.data} });
      // dialogRef.afterClosed().subscribe(result => {
      //   
      // })
    }

    getAllQuotationDetails(){
      this.prService.getAllQuotationDetails(this.id).subscribe((res:any)=>{
      this.rowData= res.data;
      })
    }

    OpenDefineDate(e:any){
      this.prService.procurementProductId.next(this.id)
      const dialogRef = this.dialog.open(QuotationDefineDateComponent, { width: '450px'  ,data:this.singlePrData});
      dialogRef.afterClosed().subscribe(result => {
        
      })
    }

    SendApproval(){

      
      if (this.remarkForm.invalid) {
        this.toast.error('Remark fields should not be empty', 'Fields Error');
        
        return;
      }
      let val = this.remarkForm.value
        let data = {
            "remarks_approvel": val.remarks_approvel,
            "approvel_vendor": "APPROVED"
        }

        this.prService.getQuotationApproval(this.id,data).subscribe((res:any) =>{
          
          if(res.code == 200){
            this.toast.success('Quotation send successfully for approval', 'Fields Success');
            this.remarkForm.reset();
            setTimeout(() => {
                this.route.navigateByUrl('master/itticket/purchase-inventory/vendor-quotation/pending-approval')
            }, 500);
          }   
        },err=>{
          if(err){
            this.toast.error('Something Went Wrong', 'Fields Error');
          }
        })
  
    }
}
