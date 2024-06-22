import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import { BankActionComponent } from './bank-action/bank-action.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { ToastrService } from 'ngx-toastr';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent {
  rowClass: any;
  private gridApi!: GridApi<any>;
  bankForm:FormGroup;
  countryList: any;
  stateList: any;
  cityList: any;

  acountType =[
    {value: 'Currant'},
    {value: 'Saving'},
  ]
  bankData: any;
  id: any;
  vendor_id: any;
  pachdata: any;
  bank_id: any;
  editBankData: any;
  vendorName: any;
  branch_City_Id: any;

  constructor(
   private route: Router,
   private _empRegistration: EmpRegistrationService,
   private fb :FormBuilder,
   private toast: ToastrService,
   private activeroute: ActivatedRoute,
   private vendorService: VendorManagementService
   ) {
   this.rowClass = 'rowClass';

   this.bankForm = this.fb.group({
    vendor_management_id: new FormControl(null),
    bank_name:  new FormControl(null,[Validators.required]),
    branch:  new FormControl(null,[Validators.required]),
    account_holder_name:  new FormControl(null,[Validators.required]),
    bank_address:  new FormControl(null,[Validators.required]),
    country_id:  new FormControl(null,[Validators.required]),
    state_id:  new FormControl(null,[Validators.required]),
    city_id: new FormControl(null,[Validators.required]),
    city_name:  new FormControl(null),
    contact_number:  new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
    account_type:  new FormControl(null,[Validators.required]),
    bank_account_number:  new FormControl(null,[Validators.required]),
    ifsc_number:  new FormControl(null,[Validators.required]),
    micr_code:  new FormControl(null,[Validators.required]),
    fax: new FormControl(null,[Validators.required]),
    swift_code: new FormControl(null,[Validators.required]),
   })

 }

 ngOnInit(): void {
  this.getAllCountry();
  this.getAllBank();
  this.getAllVendorName();

  this.activeroute.queryParams.subscribe((params: any) => {
    this.id = params;
    this.vendor_id = params.vandor_id || params.id;
    
  });
  this.vendorService.getVendorById(this.vendor_id).subscribe((res:any)=>{
    this.editBankData= res.data ;
    this.getStateByCountry(Number(this.editBankData?.country_id));
    this.getCityByState((Number(this.editBankData?.state_id)));
    
  this.bankForm.patchValue({
    bank_name:this.editBankData.bank_name ,
    branch:this.editBankData.branch ,
    account_holder_name:this.editBankData.account_holder_name ,
    bank_address: this.editBankData.bank_address,
    country_id: Number(this.editBankData?.country_id),
    state_id: this.editBankData.state_id,
    city_id:this.editBankData.city_id,
    contact_number:this.editBankData.contact_number,
    account_type: this.editBankData.account_type,
    bank_account_number: this.editBankData.bank_account_number,
    ifsc_number:this.editBankData.ifsc_number ,
    micr_code:this.editBankData.micr_code ,
    fax:this.editBankData.fax,
    swift_code:this.editBankData.swift_code,
  })
 })
 if(this.editBankData){
  this.bankForm.controls['country_id'].patchValue(Number(this.editBankData?.country_id));
}
}

  public rowData:any;

  public columnDefs = [
    {
      headerName: 'Sr No.',
      field: 'bank_details_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
    },
    {
      headerName: 'Bank Name',
      field: 'bank_name',
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
      headerName: 'Account Type',
      field: 'account_type',
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
      headerName: 'IFSC CODE',
      field: 'ifsc_number',
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
      headerName: 'Account Holder Name ',
      field: 'account_holder_name',
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
      field: 'vendor_id', sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      flex:1,
      minWidth:150,
      cellRenderer: BankActionComponent,
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

  getAllCountry() {
    this._empRegistration.getAllcountry().subscribe(
      (res: any) => {
        this.countryList = res.data;
        
      })
  };

  countryChange(e:any){
    
    this.getStateByCountry(e.value);
  };

  getStateByCountry(id: any) {
    this._empRegistration.getStateByCountry(id).subscribe(
      (res: any) => {
        this.stateList = res.data;
        
        if(this.editBankData || this.pachdata){
          this.bankForm.controls['state_id'].patchValue(Number(this.editBankData?.state_id || this.pachdata.state_id))
          this.getCityByState(this.editBankData?.state_id ||this.pachdata.state_id)
        }
      }
    )
  };

  stateChange(e:any){
    
    this.getCityByState(e.value)
  }

  cityOnChange(e:any){
   this.branch_City_Id= e.value;
   
   
  }

  getCityByState(id: any) {
    this._empRegistration.getCityByState(id).subscribe(
      (res: any) => {
        this.cityList = res.data;
        
        if(this.editBankData || this.pachdata){
          this.bankForm.controls['city_id'].patchValue(Number(this.editBankData?.city_id || this.pachdata.city_id))
        }
      }
    )
  };

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  crateBankDetail(){
    if (this.bankForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }

    let barnchCitydata = this.cityList.find((e:any)=> e.city_id === this.branch_City_Id)
    

    const val = this.bankForm.value;
    let data ={
      vendor_management_id: val.vendor_management_id,
      bank_name:val.bank_name,
      branch:val.branch ,
      account_holder_name:val.account_holder_name ,
      bank_address: val.bank_address,
      country_id: val?.country_id,
      state_id: val.state_id,
      city_id:val.city_id ,
      city_name: barnchCitydata?.city_name || this.pachdata.city_name,
      contact_number:val.contact_number,
      account_type: val.account_type,
      bank_account_number: val.bank_account_number,
      ifsc_number:val.ifsc_number ,
      micr_code:val.micr_code ,
      fax:val.fax,
      swift_code:val.swift_code,
    }

    
    

    this.vendorService.crateBankDetail(data).subscribe((res:any)=>{
      this.bankData = res.dsta;
      if (res.code == 200) {
        this.toast.success(res.message);
        this.reloadCurrentRoute();
      }
    }, (err) => {
     
     
      if (err.status === 404) {
        
        this.toast.error(err.error.message);
      }
      else if (err.status == 500) {
        this.toast.error(err.message)
      }
      else {
        this.toast.error('Something Went Wrong!!')
      }
    })
  }

  getAllBank(){
    this.vendorService.getAllBank().subscribe((res:any)=>{
      this.rowData =res.data;
    })
  }

  editBankById(){
    if (this.bankForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
    let barnchCitydata = this.cityList.find((e:any)=> e.city_id === this.branch_City_Id)
    

    const val = this.bankForm.value;
    let data ={
      vendor_management_id: val.vendor_management_id,
      bank_name:val.bank_name,
      branch:val.branch ,
      account_holder_name:val.account_holder_name ,
      bank_address: val.bank_address,
      country_id: val?.country_id,
      state_id: val.state_id,
      city_id:val.city_id ,
      city_name: barnchCitydata?.city_name || this.pachdata?.city_name,
      contact_number:val.contact_number,
      account_type: val.account_type,
      bank_account_number: val.bank_account_number,
      ifsc_number:val.ifsc_number ,
      micr_code:val.micr_code ,
      fax:val.fax,
      swift_code:val.swift_code,
    }
    this.vendorService.editBank(this.vendor_id, data).subscribe((res:any)=>{
      this.bankData = res.data;
      if(this.bankData){
        this.route.navigate(
          ['/master/itticket/purchase-inventory/create-vender/documents'],
          { queryParams: { vandor_id: this.vendor_id }}
        );
        this.toast.success(res.message);
      }
    })
  }

  cellClicked(e:any){
    this.getAllCountry();
    this.bank_id = e.data.bank_details_id;
    this.pachdata = e.data;
    this.getStateByCountry(Number(this.pachdata?.country_id));
    this.getCityByState((Number(this.pachdata?.state_id)));
    
    this.bankForm.patchValue({
      bank_name:this.pachdata.bank_name ,
      branch:this.pachdata.branch ,
      account_holder_name:this.pachdata.account_holder_name ,
      bank_address: this.pachdata.bank_address,
      country_id: Number(this.editBankData?.country_id),
      contact_number:this.pachdata.contact_number,
      account_type: this.pachdata.account_type,
      bank_account_number: this.pachdata.bank_account_number,
      ifsc_number:this.pachdata.ifsc_number ,
      micr_code:this.pachdata.micr_code ,
      fax:this.pachdata.fax,
      swift_code:this.pachdata.swift_code,
    })
    this.bankForm.controls['country_id'].patchValue(Number(this.pachdata?.country_id));
  }

  updateBank(){

    let barnchCitydata = this.cityList.find((e:any)=> e.city_id === this.branch_City_Id)
    console.log("statedata",barnchCitydata);
    const val = this.bankForm.value;
    let data ={
      vendor_management_id: this.pachdata.vendor_management_id,
      bank_name:val.bank_name,
      branch:val.branch ,
      account_holder_name:val.account_holder_name ,
      bank_address: val.bank_address,
      country_id: val?.country_id,
      state_id: val.state_id,
      city_id:val.city_id ,
      city_name: barnchCitydata?.city_name || this.pachdata?.city_name,
      contact_number:val.contact_number,
      account_type: val.account_type,
      bank_account_number: val.bank_account_number,
      ifsc_number:val.ifsc_number ,
      micr_code:val.micr_code ,
      fax:val.fax,
      swift_code:val.swift_code,
    }
    this.vendorService.editVendorBank(this.bank_id, data).subscribe((res:any)=>{
      this.bankData = res.data;
      if(this.bankData){
        this.toast.success(res.message);
        this.reloadCurrentRoute();
      }
    }) 
  }

  getAllVendorName(){
    this.vendorService.getAllVendorName().subscribe((res:any)=>{
      this.vendorName = res.data;
    })
  }

  
}
