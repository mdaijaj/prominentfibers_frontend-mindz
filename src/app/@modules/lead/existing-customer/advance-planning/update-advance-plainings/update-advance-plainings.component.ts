import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigurationalmasterService } from 'src/app/@shared/services/configurationalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { error } from 'console';

@Component({
  selector: 'app-update-advance-plainings',
  templateUrl: './update-advance-plainings.component.html',
  styleUrls: ['./update-advance-plainings.component.scss']
})
export class UpdateAdvancePlainingsComponent implements OnInit {
  panelOpenState = false;
  section1: any = "section1";
  update_form: FormGroup;
  update_adv: FormGroup;
  fff: any;
  imageToUpload: any;
  imageToUpload1: any;
  imagePath: any;
  imagePath1: any;
  data1: any;
  getData: any;
  // data:any;
  dddd: any = '';
  productDataId: any;
  show: boolean = false;
  getLeadbyID: any;
  lead_id: any;
  patch_value: any;
  check: any;
  stage: any;
  @ViewChild('container') containerRef: ElementRef;
  types: any;

  // scrollToSection(sectionId: string): void {
  //   const sectionElement = document.getElementById(sectionId);
  //   if (sectionElement) {
  //     this.containerRef.nativeElement.scrollTo({
  //       top: sectionElement.offsetTop,
  //       behavior: 'smooth'
  //     });
  //   }
  // }

  constructor(private fb: FormBuilder,
    private leadService: LeadService,
    private activateRoute: ActivatedRoute,
    private config_service: ConfigurationalmasterService,
    private toast: ToastrService,
    private route: Router,
    private elementRef: ElementRef, private renderer: Renderer2

  ) {
    this.activateRoute.queryParams.subscribe(
      (res: any) => {
        this.types = res.type
        this.check = res.check
        this.lead_id = res.lead_generate_id
        this.getByIdLead(this.lead_id)
        console.log(this.types, "types check ");


      })

    this.update_form = this.fb.group({
      associatedCompany: new FormControl('', Validators.required),
      brNo: new FormControl('', Validators.required),
      segment: new FormControl('', Validators.required),
      certificateType: new FormControl('', Validators.required),
      customerSalesExecutive: new FormControl(''),
      assignOpportunityto: new FormControl('', Validators.required),
      opportunityType: new FormControl('', Validators.required),
      opportunityRefNo: new FormControl('', Validators.required),
      stage: new FormControl('', Validators.required),
      productRequested: new FormControl('', Validators.required),
    });

    this.update_adv = this.fb.group({
      intimationDate: new FormControl('', Validators.required),
      followUpDate: new FormControl('', Validators.required),
      cifReceivedDate: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      remarks: new FormControl(''),
    });
  }


  ngOnInit(): void {

  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }



  productSaves(update_form: any) {




    // if (this.update_form.invalid) {
    //   this.toast.error('Enter Required Field', 'Something Went Wrong')
    //   return;
    // }
    // let val = this.update_form.value;
  }
  getByIdLead(leadID: any) {
    this.leadService.getByIdLead(leadID).subscribe((res: any) => {

      this.getLeadbyID = res.data
      this.stage = res.stage

      this.patch_value = this.update_form.patchValue({
        associatedCompany: this.getLeadbyID?.associated_company,
        brNo: this.getLeadbyID?.br_number,
        segment: this.getLeadbyID?.segment_name,
        customerSalesExecutive: this.getLeadbyID?.customer_sales_executive,
        assignOpportunityto: this.getLeadbyID?.assigned_to,
        opportunityType: this.getLeadbyID?.opportunity_type,
        opportunityRefNo: this.getLeadbyID?.otherFile_count,
        stage: this.stage,
        productRequested: this.getLeadbyID?.product_request,
        certificateType: this.getLeadbyID?.certificate_type_name,
      })
    })
  }
  onFactoryButtonClick(e: any, section1: any) {
    // window.scrollTo(0, document.body.scrollHeight);
    this.show = true
    setTimeout(() => {
      const element = this.elementRef.nativeElement;
      console.log(element);
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 500);
  }
  update(updateform: any) {

    const data = {
      lead_genration_id: this.lead_id,
      intimation_date: moment(updateform.value.cifReceivedDate).format('YYYY-MM-DD'),
      follow_up_date: moment(updateform.value.followUpDate).format('YYYY-MM-DD'),
      cif_received_date: moment(updateform.value.intimationDate).format('YYYY-MM-DD'),
      status: updateform.value.status,
      remarks: updateform.value.remarks,
      previousStage: this.stage
    }
    //;
    //;
    //;
    this.leadService.updatedbyCSP(data).subscribe((res: any) => {
      console.log(res, "cocoococococ");

      this.toast.success("Updated Successfully..");
      // this.reloadCurrentRoute();
      window.location.reload();
    },
      (err) => {
        if (err.status == 400) {
          this.toast.error('Something went Wrong');
        } else {
          this.toast.error('Please fill correct data.');
        }
      })
    // window.location.reload();
  }
  cifDate(e: any) {

  }
  followDate(e: any) {

  }
  intimationDate(e: any) {

  }
}
