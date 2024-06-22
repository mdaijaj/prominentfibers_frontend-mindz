import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { PurchaseRequestService } from 'src/app/@shared/services/purchase-request.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';
import { environment } from 'src/app/environments/environment';

const databaseKey: any = environment.servralUrl;

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent {
  cityList: any;
  basicForm:FormGroup;
  countryList: any;
  stateList: any;
  gstvalue: any;
  gst: boolean;
  regionlist: any;
  subTypeList: any;
  vendorTypeList: any;
  vendor_id: any;
  id: any;
  editbasicData: any;
  Data: any;
  contryName: any;
  countrey_id: any;
  state_id: any;
  city_id: any;
  status: any;
  cat_value: any;
  cat: boolean= false;
  Domestic: boolean=false;
  disablefield: boolean;
  getCat_data:any
  currencyData: any;
  depData: any;
  nameSearch:any ='';

  constructor(
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private vendorService: VendorManagementService,
    private prService: PurchaseRequestService,
    private _configurationalMasterService: ConfigurationalmasterService,
  ) {
console.log(window.location);


    this.basicForm = this.fb.group({
      // type_of_vendor: new FormControl(null,[Validators.required]),
      // sub_type: new FormControl(null,[Validators.required]),
      vendor_name: new FormControl(null, [Validators.required]),
      // vendor_code:new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      country_id: new FormControl(null, [Validators.required]),
      state_id: new FormControl(null, [Validators.required]),
      // district: new FormControl(null,[Validators.required]),
      city_id: new FormControl(null, [Validators.required]),
      pin: new FormControl(null,[Validators.required,Validators.pattern('[0-9]{6}')]),
      contact_number: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      alternative_number: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      web: new FormControl(null,[Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')]),
      fax: new FormControl(null,[Validators.required]),
      // region: new FormControl(null,[Validators.required]),
      contact_person: new FormControl(null,[Validators.required]),
      // state_code: new FormControl(null,[Validators.required]),
      under_gst: new FormControl(null),
      department: new FormControl(null),
      pan: new FormControl(null, [Validators.pattern('[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}')]),
      CIN_No:new FormControl(null),
      gst_in:new FormControl(null, [
        Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]),
      msme: new FormControl(null),
      description_of_goods:new FormControl(null),
      currency: new FormControl(null),
      term_and_conditions: new FormControl(null),
      country_name:new FormControl(null),
      state_name: new FormControl(null),
      city_name:  new FormControl(null),
      category: new FormControl(null),
      // foreign_unique_Id: new FormControl(null),
      remarks: new FormControl(null),
      asset_category_id:new FormControl(null,[Validators.required]),
      search:new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getAllCountry();
    this.regionlist_dropDown();
    this.subType();
    this.vendorType();
    this.getCurrency()
    this.getDepartment();
    
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.vendor_id = params.id;
      this.status = params.status;
      this.disablefield = this.status? true:false;
      if(this.disablefield){
        // this.basicForm.controls['type_of_vendor'].disable();
        // this.basicForm.controls['sub_type'].disable();
        this.basicForm.controls['vendor_name'].disable();
        this.basicForm.controls['address'].disable();
        // this.basicForm.controls['district'].disable();
        this.basicForm.controls['pin'].disable();
        this.basicForm.controls['contact_number'].disable();
        // this.basicForm.controls['state_code'].disable();
        this.basicForm.controls['under_gst'].disable();
        this.basicForm.controls['alternative_number'].disable();
        this.basicForm.controls['email'].disable();
        this.basicForm.controls['web'].disable();
        this.basicForm.controls['fax'].disable();
        // this.basicForm.controls['region'].disable();
        this.basicForm.controls['contact_person'].disable();
        this.basicForm.controls['department'].disable();
        this.basicForm.controls['pan'].disable();
        this.basicForm.controls['CIN_No'].disable();
        this.basicForm.controls['gst_in'].disable();
        this.basicForm.controls['msme'].disable();

        this.basicForm.controls['country_id'].disable();
        this.basicForm.controls['state_id'].disable();
        this.basicForm.controls['city_id'].disable();
        this.basicForm.controls['description_of_goods'].disable();
        this.basicForm.controls['CIN_No'].disable();
        this.basicForm.controls['gst_in'].disable();
        // this.basicForm.controls['foreign_unique_Id'].disable();
        this.basicForm.controls['term_and_conditions'].disable();
        // this.basicForm.controls['CIN_No'].disable();
        this.basicForm.controls['category'].disable();
        this.basicForm.controls['currency'].disable();
        this.basicForm.controls['remarks'].disable();
        this.basicForm.controls['asset_category_id'].disable();
      }
    });

    this.vendorService.getVendorById(this.vendor_id).subscribe((res:any)=>{
      this.editbasicData= res.data 
      this.gst = this.editbasicData?.under_gst ==='yes' ? true:
      false;
      this.getStateByCountry(Number(this.editbasicData?.country_id));
      this.getCityByState((Number(this.editbasicData?.state_id)));
      
      
      this.basicForm.patchValue({
      // type_of_vendor: this.editbasicData?.type_of_vendor,
      // sub_type: this.editbasicData?.sub_type,
      vendor_name: this.editbasicData?.vendor_name,
      // vendor_code:this.editbasicData.vendor_code,
      address: this.editbasicData?.address,
      country_id: Number(this.editbasicData?.country_id),
      // district: this.editbasicData?.district,
      pin: this.editbasicData?.pin,
      contact_number: this.editbasicData?.contact_number,
      alternative_number:this.editbasicData?.alternative_number, 
      email: this.editbasicData?.email,
      web: this.editbasicData?.web,
      fax: this.editbasicData?.fax,
      // region: this.editbasicData?.region,
      contact_person: this.editbasicData?.contact_person,
      // state_code: this.editbasicData?.state_code,
      under_gst: this.editbasicData?.under_gst || "no",
      department: this.editbasicData?.department,
      pan: this.editbasicData?.pan,
      CIN_No:this.editbasicData?.CIN_No,
      gst_in:this.editbasicData?.gst_in,
      msme: this.editbasicData?.msme,
      description_of_goods:this.editbasicData?.description_of_goods,
      currency: this.editbasicData?.currency,
      term_and_conditions: this.editbasicData?.term_and_conditions,
      // foreign_unique_Id:this.editbasicData?.foreign_unique_Id,
      remarks:this.editbasicData?.remarks,
      asset_category_id:this.editbasicData?.asset_category_id
    })

   })
   if(this.editbasicData){
     this.basicForm.controls['country_id'].patchValue(Number(this.editbasicData?.country_id))
  }
  this.prService.getAllCategory().subscribe((res:any)=>{
    this.getCat_data= res.data;
  })

  
  }

  getDepartment() {
    this._configurationalMasterService.getDepartment().subscribe((res: any) => {
      this.depData = res.data;
      
    })
  }


  getCurrency() {
    this._configurationalMasterService.CurrencyList().subscribe((res: any) => {
      this.currencyData = res.data;
      

    })
  }


  gstGetValue(e:any){
    this.gstvalue = e.value;
    this.gst = e.value =='yes' ?true:
    false;
  }

  onSubmit(){
    if (this.basicForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
   let contryData:any = this.countryList?.find((e:any) => e.countryss_id === this.countrey_id);
   
   let stateData = this.stateList.find((e:any)=> e.states_id === this.state_id)
   
   let citydata = this.cityList.find((e:any)=> e.city_id === this.city_id)
   
   
    let val = this.basicForm.value;

    let formData = {
      // type_of_vendor: val.type_of_vendor,
      // sub_type: val.sub_type,
      vendor_name: val.vendor_name,
      // vendor_code:val.vendor_code,
      address: val.address,
      country_id: val?.country_id,
      state_id: val?.state_id,
      city_id:val?.city_id,
      // district: val.district,
      pin: val.pin,
      contact_number: val.contact_number,
      alternative_number:val.alternative_number, 
      email: val.email,
      web: val.web,
      fax: val.fax,
      // region: val.region,
      contact_person: val.contact_person,
      // state_code: val.state_code,
      under_gst: val.under_gst,
      department: val.department,
      pan: val.pan,
      CIN_No: val.CIN_No,
      gst_in:val.gst_in,
      msme: val.msme,
      description_of_goods:val.description_of_goods,
      currency: val.currency,
      term_and_conditions: val.term_and_conditions,
      country_name: contryData.countryss_name,
      state_name: stateData.states_name,
      city_name: citydata.city_name,
      web_site_url: window.location.origin +'/send-vendor/basic-details',
      // foreign_unique_Id:val.foreign_unique_Id,
      remarks:val.remarks,
      asset_category_id:val.asset_category_id,
    }
     
     console.log('formData', formData);
     
     this.vendorService.createVandor(formData).subscribe((res:any)=>{
        if(res.code== 200){
          this.toast.success(res.message);
          this.vendor_id = res.data.vendor_management_id;
          
          this.route.navigate(
            ['master/vendor/vendor-list/create-vendor/bank-details'],
            { queryParams: { id: this.vendor_id }}
          );
        }
   },(err)=>{
    this.toast.error(err.error.message);
  })
  }

   getAllCountry() {
    this._empRegistration.getAllcountry().subscribe(
      (res: any) => {
        this.countryList = res.data;
        
      })
  };

  countryChange(e:any){
    
    this.countrey_id = e.value;
    this.getStateByCountry(e.value);
  };

  getStateByCountry(id: any) {
    this._empRegistration.getStateByCountry(id).subscribe(
      (res: any) => {
        this.stateList = res.data;
        
       // this.contryName =res.data[0].countryss_name;
        
        if(this.editbasicData){
          this.basicForm.controls['state_id'].patchValue(Number(this.editbasicData?.state_id))
        }
      }
    )
  }

  stateChange(e:any){
    
    this.state_id = e.value;
    this.getCityByState(e.value)
  }

  cityChange(e:any){
    
    this.city_id = e.value;
    // this.getCityByState(e.value)
  }



  getCityByState(id: any) {
    this._empRegistration.getCityByState(id).subscribe(
      (res: any) => {
        this.cityList = res.data;
        
        if(this.editbasicData){
          this.basicForm.controls['city_id'].patchValue(Number(this.editbasicData?.city_id))
        }
      }
    )
  };

  regionlist_dropDown() {
    this._empRegistration.regionlist_dropDown().subscribe(
      (res) => {
        
        this.regionlist = res.data;
      }
    );
  };

  subType(){
    this.vendorService.getSubType().subscribe((res:any)=>{
      this.subTypeList = res.data;
    })
  }

  vendorType(){
    this.vendorService.getVendorType().subscribe((res:any)=>{
      this.vendorTypeList = res.data;
    })
  }

  onCancel(path:any){
     this.route.navigate([path])
  }

  onUpdate(){
    this.vendorService.editVendor(this.vendor_id,this.basicForm.value).subscribe((res:any)=>{
      this.Data = res.data;
      if(this.Data){
        this.toast.success(res.message);
        this.route.navigate(
          ['master/vendor/vendor-list/create-vendor/bank-details'],
          { queryParams: { id: this.vendor_id }}
        );
      }
    }) 
  }

  accountApprove(){
        this.vendorService.editVendor(this.vendor_id,this.basicForm.value).subscribe((res:any)=>{
          this.Data = res.data;
          if(this.Data){
            this.toast.success('Basic Details verified');
            this.route.navigate(
              ['master/vendor/vendor-list/create-vendor/bank-details'],
              { queryParams: { id: this.vendor_id, status:this.status }}
            );
          }
        }) 

  }

  categoryValue(e:any){
    this.cat_value = e.value;
    if(e.value =='International'){
      this.cat =true;
      this.gst=false;
    }
    if(e.value =='Domestic'){
      this.cat=false;
      this.basicForm.controls['under_gst'].reset("");
    }
  }


  

}
