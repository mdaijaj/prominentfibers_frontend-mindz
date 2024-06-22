import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpMasterService } from 'src/app/@shared/services/emp-master.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';

@Component({
  selector: 'app-service-master-create',
  templateUrl: './service-master-create.component.html',
  styleUrls: ['./service-master-create.component.scss']
})
export class ServiceMasterCreateComponent {

  serviceMasterForm: any;
  service_id: any;
  parm: any;
  getData: any;
  propertyManager: any;
  firstLastName: any;
  personalIdData: any;
  wordCount: any;
  @ViewChild("text") text: ElementRef;
  words: any;
  extraWords: boolean = false;
  asignData: any;
  asignvariables: any;
  asignvariable: any;
  uniqueId: any;
  uniquedata: any;
  countrey_id: any;
  cityList: any;
  nameSearch: any = '';
  variables: any = [];
  variable: any = [];
  checkData: any;
  getCat_data: any[] = [];
  imageToUpload: any;
  imagePath: any;
  singleItem: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private emp_master: EmpMasterService,
    private _configurationalMasterService: ConfigurationalmasterService,
    private toast: ToastrService,
    private locatin: Location,
    private _empRegistration: EmpRegistrationService,
    private recruitService: RecruitService,
    private location: Location
  ) {
    // serviceMasterForm
    this.serviceMasterForm = this.fb.group({
      service_category_id: new FormControl(null),
      service_name: new FormControl(null, [Validators.required]),
      service_description: new FormControl(null, [Validators.required]),
      MVP: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    })
  }
  get CF_1(): any { return this.serviceMasterForm.controls };
  ngOnInit(): void {
    this.activetedRoute.queryParams.subscribe((params: any) => {
      this.parm = params;
      this.service_id = params.service_id;

    })
    this.getAssginSingle();
    if (this.service_id) {
      this.CF_1['image'].setErrors(null);
      this._configurationalMasterService.getByIdServiceMaster(this.service_id).subscribe((res: any) => {
        this.singleItem = res.data;
        this.CF_1['image'].setErrors(null);
        this.serviceMasterForm.patchValue({
          item_name: this.singleItem?.item_name,
          MVP: this.singleItem?.MVP,
          asset_id: this.singleItem?.asset_id,
          uom_id: this.singleItem?.uom_id,
        })
      })
    }
    this.AutoGenerateRequestNo()
    this._empRegistration.grtEmployeeList().subscribe((res: any) => {
      this.personalIdData = res.data;
      this.propertyManager = Array.from(this.personalIdData, (a: any) => `${a.first_name} ${a.last_name}`)
    })
    this._empRegistration.getByUserId(localStorage.getItem('EmpMainId')).subscribe((res: any) => {
      this.getData = res.data.first_name;
      this.serviceMasterForm.controls['requester'].setValue(this.getData);
    })
    this._configurationalMasterService.getServiceCategoryMasterList().subscribe((res: any) => {
      this.getCat_data = res.data;
    })
    if (!this.service_id) {
      this.getuniqueNumber();
    }
  }
  goBack() {
    this.location.back();
  }
  getAssginSingle() {
    this.recruitService.getSpocRecruipment().subscribe((res: any) => {
      this.asignData = res.data;
      this.asignvariables = this.asignData.map((res: any) => res.first_name)
      this.asignvariable = this.asignData
    });
  }
  changedText() {
    if (this.words >= 50) {
      this.extraWords = true;
      this.toast.warning('Please enter within the text limit..', 'Warning Message');
      return
    } else if (this.words < 50) {
      this.extraWords = false;
    }
  }
  back() {
    history.back()
  }
  AutoGenerateRequestNo() {
    this.emp_master.AutoGenerateRequestNo().subscribe((response: any) => {
      console.log(response);
      const apiRequestNo = response.data;
    },
      (error) => {
      }
    )
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
  basicFormPatch(getData: any) {
    this.serviceMasterForm.patchValue({
      service_category_id: getData?.service_category_id,
      service_code: getData?.service_code,
      service_name: getData?.service_name,
      service_description: getData?.service_description,
      MVP: getData?.MVP,
      service_document: getData?.service_document,
    })
  }
  updateForm(e: any) {
    e.stopPropagation();
    this._configurationalMasterService.updateServiceMaster(this.service_id, this.serviceMasterForm.value).subscribe((res: any) => {
      this.toast.success("Service Master Updated successfully", "Updated successfully")
      this.router.navigate(['master/itticket/configurational-master/service-master']);
    }, (err) => {
      this.toast.error("Something went wron please try again", "Error Massage");
    }
    )
  }
  onSubmitForm() {
    let val = this.serviceMasterForm.value;
    let formData = new FormData();
    formData.append('service_category_id', val.service_category_id);
    formData.append('MVP', val.MVP);
    formData.append('image', this.imageToUpload);
    formData.append('service_name', val.service_name);
    formData.append(`service_description`, val.service_description);
    if (this.serviceMasterForm.invalid) {
      this.toast.error('required fields should not be blank', 'Required fields');
      return
    }
    this._configurationalMasterService.createServiceMaster(val).subscribe((res: any) => {

      this.toast.success("Service Master created successfully", "Created Successfully");
      this.router.navigate(['master/itticket/configurational-master/service-master']);
    }, (err) => {

      if (err.error.code === 403) {
        this.toast.error(`${err.error.message}`, "Error Massage");
      } else {
        this.toast.error("Something went wron please try again", "Error Massage");
      }
    }
    )
  }
  getuniqueNumber() {
    this.emp_master.getUniqueNumber().subscribe((res: any) => {
      console.log(res, 'res');
      this.uniquedata = res.data;

      this.serviceMasterForm.patchValue({
        request_no: this.uniquedata
      });
      this.serviceMasterForm.controls['request_no'].disable();
    })
  }

}

