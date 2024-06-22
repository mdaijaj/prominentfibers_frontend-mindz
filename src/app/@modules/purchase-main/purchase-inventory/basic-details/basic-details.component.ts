import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { HeadService } from 'src/app/@shared/services/head.service';
import { VendorManagementService } from 'src/app/@shared/services/vendor-management.service';

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
  constructor(
    private fb: FormBuilder,
    private _empRegistration: EmpRegistrationService,
    private toast: ToastrService,
    private route: Router,
    private activeroute: ActivatedRoute,
    private vendorService: VendorManagementService
  ) {

    this.basicForm = this.fb.group({
      type_of_vendor: new FormControl(null,[Validators.required]),
      sub_type: new FormControl(null,[Validators.required]),
      vendor_name: new FormControl(null, [Validators.required]),
      vendor_code:new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      country_id: new FormControl(null, [Validators.required]),
      state_id: new FormControl(null, [Validators.required]),
      district: new FormControl(null,[Validators.required]),
      city_id: new FormControl(null, [Validators.required]),
      pin: new FormControl(null,[Validators.required]),
      contact_number: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      alternative_number: new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl(null,[Validators.required]),
      web: new FormControl(null,[Validators.required]),
      fax: new FormControl(null,[Validators.required]),
      region: new FormControl(null,[Validators.required]),
      contact_person: new FormControl(null,[Validators.required]),
      state_code: new FormControl(null,[Validators.required]),
      under_gst: new FormControl(null,[Validators.required]),
      department: new FormControl(null),
      pan: new FormControl(null),
      provisional_id:new FormControl(null),
      gst_in:new FormControl(null),
      msme: new FormControl(null),
      description_of_goods:new FormControl(null),
      currency: new FormControl(null),
      term_and_conditions: new FormControl(null),
      country_name:new FormControl(null),
      state_name: new FormControl(null),
      city_name:  new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getAllCountry();
    this.regionlist_dropDown();
    this.subType();
    this.vendorType();
    
    this.activeroute.queryParams.subscribe((params: any) => {
      this.id = params;
      this.vendor_id = params.id;
      
    });

    this.vendorService.getVendorById(this.vendor_id).subscribe((res:any)=>{
      this.editbasicData= res.data 
      this.gst = this.editbasicData?.under_gst ==='no' ? true:
      false;
      this.getStateByCountry(Number(this.editbasicData?.country_id));
      this.getCityByState((Number(this.editbasicData?.state_id)));
      
      
      this.basicForm.patchValue({
      type_of_vendor: this.editbasicData.type_of_vendor,
      sub_type: this.editbasicData.sub_type,
      vendor_name: this.editbasicData.vendor_name,
      vendor_code:this.editbasicData.vendor_code,
      address: this.editbasicData.address,
      country_id: Number(this.editbasicData?.country_id),
      district: this.editbasicData.district,
      pin: this.editbasicData.pin,
      contact_number: this.editbasicData.contact_number,
      alternative_number:this.editbasicData.alternative_number, 
      email: this.editbasicData.email,
      web: this.editbasicData.web,
      fax: this.editbasicData.fax,
      region: this.editbasicData.region,
      contact_person: this.editbasicData.contact_person,
      state_code: this.editbasicData.state_code,
      under_gst: this.editbasicData.under_gst,
      department: this.editbasicData.department,
      pan: this.editbasicData.pan,
      provisional_id:this.editbasicData.provisional_id,
      gst_in:this.editbasicData.gst_in,
      msme: this.editbasicData.msme,
      description_of_goods:this.editbasicData.description_of_goods,
      currency: this.editbasicData.currency,
      term_and_conditions: this.editbasicData.term_and_conditions
    })

   })
   if(this.editbasicData){
     this.basicForm.controls['country_id'].patchValue(Number(this.editbasicData?.country_id))
  }
  }

  


  gstGetValue(e:any){
    this.gstvalue = e.value;
    this.gst = e.value =='no' ?true:
    false;
  }

  onSubmit(){
    if (this.basicForm.invalid) {
      this.toast.error('Required fields should not be empty', 'Fields Error');
      
      return;
    }
   let contryData = this.countryList?.find((e:any) => e.countryss_id === this.countrey_id);
   
   let stateData = this.stateList.find((e:any)=> e.states_id === this.state_id)
   
   let citydata = this.cityList.find((e:any)=> e.city_id === this.city_id)
   
   
    let val = this.basicForm.value;

    let formData = {
      type_of_vendor: val.type_of_vendor,
      sub_type: val.sub_type,
      vendor_name: val.vendor_name,
      vendor_code:val.vendor_code,
      address: val.address,
      country_id: val?.country_id,
      state_id: val?.state_id,
      city_id:val?.city_id,
      district: val.district,
      pin: val.pin,
      contact_number: val.contact_number,
      alternative_number:val.alternative_number, 
      email: val.email,
      web: val.web,
      fax: val.fax,
      region: val.region,
      contact_person: val.contact_person,
      state_code: val.state_code,
      under_gst: val.under_gst,
      department: val.department,
      pan: val.pan,
      provisional_id:val.provisional_id,
      gst_in:val.gst_in,
      msme: val.msme,
      description_of_goods:val.description_of_goods,
      currency: val.currency,
      term_and_conditions: val.term_and_conditions,
      country_name: contryData.countryss_name,
      state_name: stateData.states_name,
      city_name: citydata.city_name,
    }
     
     
     this.vendorService.createVandor(formData).subscribe((res:any)=>{
      if(res){
        this.toast.success(res.message);
        this.vendor_id = res.data.vendor_management_id;
        
        this.route.navigate(
          ['/master/itticket/purchase-inventory/create-vender/bank-details'],
          { queryParams: { vandor_id: this.vendor_id }}
        );
      }
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
          ['/master/itticket/purchase-inventory/create-vender/bank-details'],
          { queryParams: { vandor_id: this.vendor_id }}
        );
      }
    }) 
  }

  

}
