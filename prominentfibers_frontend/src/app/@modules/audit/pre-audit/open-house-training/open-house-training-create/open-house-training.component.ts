import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { calendarFormat } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { EmpRegistrationService } from 'src/app/@shared/services/emp-registration.service';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { RecruitService } from 'src/app/@shared/services/recruitment.service';
import { ConfigurationalmasterService } from '../../../../../@shared/services/configurationalmaster.service'
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from "@angular/common";
import Swal from 'sweetalert2';
const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-open-house-training',
  templateUrl: './open-house-training.component.html',
  styleUrls: ['./open-house-training.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    DatePipe
  ]
})
export class OpenHouseComponent {
  leadForm: FormGroup;
  jobType: any;
  candidateArray: any;
  interviewGetId:any;
  candidateId: any;
  id: any;
  val: any;
  public searchResult: any;
  interview_id: any;
  clicked: boolean = false;
  cutomerType: boolean = false;
  sitAudit: boolean = false;
  lead_id: any;
  singleLeadData: any;
  mainId: string | null;
  mainEmployeeData: any;
  allAchievement: any;
  categoryList: any;
  myDate = new Date();
  countryList: any[] = [];
  cityList: any;
  stateList: any;
  countryName: any;
  standardList: any;
  allCompanyList: any;
  // rowDatas: any;
  addormData: any;
  rowData:any;
  private gridApi!: GridApi<any>;
  addParticipantId:any;
  Login_user: any = localStorage.getItem('signInUser');
  loginUserName: any = JSON.parse(this.Login_user).first_name;
  Login_user_id:any = JSON.parse(this.Login_user).employee_id;
  todayDate:any= new Date();
  startDate: Date;
endDate: Date;
numberOfDays: number;
programOrgVar:any=[];
programOrgVar2:any=[];
programListVar:any=[];
programListVar2:any=[];
leadSourceData:any;
  
  dataParticipant: {
    lead_genration_id: any; participant_name: any; email_id: any;
    // countryss_name: this.addormData.countryss_name,
    contact_number: any; program_cost: any; discount_percentage: any; final_fee_after_discount: any; gst_percentage: any; total_cost_after_taxes: any; advance_fee_collected: any; advance_percentage: any; payment_details: any; promise_to_pay_date: string;
  };
  loggedInUser: any;
  templateToUpload: any;
  templatePath: any;
  imagePath: any;
  singleData: any;
  showTrainingLocation:boolean = false;
  constructor(private fb: FormBuilder, 
    private leadService: LeadService, 
    private route: Router, 
    private recruitService: RecruitService, 
    private activeroute: ActivatedRoute,
    private toast: ToastrService,
    private configService: ConfigurationalmasterService,
    private _empRegistration: EmpRegistrationService
    ) {
    this.leadForm = this.fb.group({
      program_title: new FormControl(null,Validators.required),
      program_name: new FormControl(null,Validators.required),
      open_house_start_date: new FormControl(null),
      open_house_end_date: new FormControl(null),
      no_of_days: new FormControl(null),
      venue: new FormControl(null),
      program_organizer: new FormControl(null),
      br_number: new FormControl(null),
      program_cost: new FormControl(null),
      program_location: new FormControl(null),
      created_by: new FormControl(this.loginUserName),
      created_date: new FormControl(this.todayDate),
      lead_source: new FormControl(null),
      participant_name:new FormControl(null),
      email_id:new FormControl(null,[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contact_number:new FormControl(null),
       program_cost2:new FormControl(null),
       disccount:new FormControl(null),
      final_fee_after:new FormControl(null),
      gst:new FormControl(null),
      total_cost:new FormControl(null),
      advance_fee_collected:new FormControl(null),
      advane:new FormControl(null),
      payment_details:new FormControl(null),
       promis_to_pay_date:new FormControl(null),
       advartisment_image :new FormControl(null,Validators.required),
       training_location:new FormControl(null),
      
    })
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      this.id = params;
      this.lead_id = this.id.openHousetrainingId;
      this.mainId = localStorage.getItem("EmpMainId");

      if (this.mainId != undefined) {
        this._empRegistration.getByUserId(this.mainId).subscribe((res) => {
          this.mainEmployeeData = res.data;
          this.loggedInUser= this.mainEmployeeData?.first_name;       
          this.leadForm.patchValue({
          created_by: this.loggedInUser,
          created_date: this.myDate,
         })
        })
      }

        this.leadService.getbyOpenHouseHrms(this.lead_id).subscribe((res:any) => {
        this.singleLeadData = res.data[0];
        
        this.patchFormvalue();      
      })
    });
    
    // this.patchFormvalue();
    this.getStandardProgram();
    this.getCompanyList()
     this.getAllLeadSource();
    this.getByAddParticipants()
   }

  getCompanyList() {
    this.leadService.getNonCertList().subscribe(
      (res: any) => {
        
        this.allCompanyList = res.result;
        this.programOrgVar = this.allCompanyList.map((res: any) => res.associated_company);
        this.programOrgVar2 = this.allCompanyList;
      },
      (err) => {
        
      }
    );
  }

  // getCity() {
  //   this.configService.getCity().subscribe((res: any) => {
  //     this.rowDatas = res.data;
      

  //   })
  // }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.allAchievement.filter(function (series:any) {
      
      return series.first_name.toLowerCase().startsWith(value)
    })
    
  }
  
  candidateClick(e:any){
    
    this.candidateId = e;
    this.recruitService.interViewGetIdBy(e).subscribe((res:any)=>{
      this.interviewGetId=res.data;
      
      this.patchFormvalue();
    })
  }

patchFormvalue() { 
    this.leadForm.patchValue({
      program_title: this.singleLeadData?.program_title,
      program_name: this.singleLeadData?.program_name,
      open_house_start_date: this.singleLeadData?.open_house_start_date,
      open_house_end_date: this.singleLeadData?.open_house_end_date,
      no_of_days: this.singleLeadData?.no_of_days,
      venue: this.singleLeadData?.venue,
      program_organizer: this.singleLeadData?.program_organizer,
      br_number: this.singleLeadData?.br_number,
      program_cost: this.singleLeadData?.program_cost,
      program_location: this.singleLeadData?.program_location,
      created_by:this.singleLeadData?.created_by,
      created_date: this.myDate,
      lead_source: this.singleLeadData?.lead_source,
    })
  }

  getStandardProgram() {
    this.configService.MSA_Non_Cert().subscribe((res: any) => {
      this.standardList = res.data;
      this.programListVar = this.standardList.map((res: any) => res.product_master_name);
      this.programListVar2 = this.standardList;
    });
  }
 
  submitForm() {
    const paymentRoute = window.location.origin + '/open-house-training/payment-link';
    const registrationRoute = window.location.origin + '/open-house-training/registration-link';
    let val = this.leadForm.value;
    
    if (val.invalid) {
      this.toast.error("fields are required");
      return
    }

    console.log('val', val);
    var formData: any = new FormData();
    formData.append('program_title', val.program_title);
    formData.append('program_name', val.program_name);
    formData.append('no_of_days', val.no_of_days);
    formData.append('venue', val.venue);
    formData.append('program_organizer', val.program_organizer);
    formData.append('br_number', val.br_number);
    formData.append('program_cost', val.program_cost);
    formData.append('program_location', val.program_location);
    formData.append('created_by', val.created_by);
    formData.append('created_date', moment(val.created_date).format('YYYY-MM-DD'),);
    formData.append('lead_source', val.lead_source);
    formData.append('open_house_start_date', moment(val.open_house_start_date).format('YYYY-MM-DD'));
    formData.append('open_house_end_date', moment(val.open_house_end_date).format('YYYY-MM-DD'));
    formData.append('status', "Open");
    formData.append('registration_Url',registrationRoute);
    formData.append('payment_Url',paymentRoute);
    formData.append('logIn_user_Id',this.Login_user_id);
    formData.append('advartisment_image',this.templateToUpload);
    formData.append('training_location',val.training_location)


    if (!this.lead_id) {
      this.leadService.createOpenHouse(formData).subscribe((res: any) => {
        this.toast.success("Open House Training Created Successfully..")
        this.route.navigate(
          ['master/audit/pre-audit/open-house-training'],
        );
      })
    } else {
      this.leadService.updateOpenHouse(this.lead_id, formData).subscribe((res: any) => {
        this.toast.success("Open House Training Updated Successfully..")
        this.route.navigate(
          ['/master/audit/pre-audit/open-house-training'],
        );
      })
    }
   
    
  }





  public columnDefs = [

    {
      headerName: 'S no',
      // valueGetter: "node.rowIndex + 1",
      field:"add_participant_id",
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Participant Name',
      field: 'participant_name',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Email ID',
      field: 'email_id',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Contact Number',
      field: 'contact_number',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Program Cost',
      field: 'program_cost',    
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:155,
      editable:true,
    },
    {
      headerName: 'Disccount %',
      field: 'discount_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'final fee After Discount',
      field: 'final_fee_after_discount',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'GST 18%',
      field: 'gst_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },
    {
      headerName: 'Total Cost (after Taxes)',
      field: 'total_cost_after_taxes',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Advance fee collected',
      field: 'advance_fee_collected',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Advance %',
      field: 'advance_percentage',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  {
      headerName: 'Payment Details',
      field: 'payment_details',
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      flex:1,
      minWidth:150,
      editable:true,
    },  
    {
      headerName: 'Promis to pay Date',
      field: 'promise_to_pay_date',
      // cellRenderer: OpenHouseRegCreateComponent,
      sortable: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      cellClass: "grid-cell-centered",
      cellRenderer: 'agGroupCellRenderer',
      flex:1,
      minWidth:150,
      editable:true,
    }
    
  ];
//   rowData:any=[
//     {participant_name:'aaa',
//     email_id:'ww',
//     contact_number:'wwww',
//     program_cost:'uu',
//     disccount:'ggggg',
//     final_fee_after:'iii',
//     gst:'eee',
//     total_cost:'wwww',
//     advance_fee_collected:'wwwww',
//     advane:'ddddd',
//     payment_details:'ffffffffffff',
//  promis_to_pay_date:'fff'},

//  {participant_name:'aaa',
//     email_id:'ww',
//     contact_number:'wwww',
//     program_cost:'uu',
//     disccount:'ggggg',
//     final_fee_after:'iii',
//     gst:'eee',
//     total_cost:'wwww',
//     advance_fee_collected:'wwwww',
//     advane:'ddddd',
//     payment_details:'ffffffffffff',
//  promis_to_pay_date:'fff'}
        
//   ]
  onCellClicked(e:any){
    
    this.route.navigate(['master/lead/lead-account/customer-account'],
        { queryParams: { lead_id:e.data.add_participant_id } }
      ); 
  }
 

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    

    
    
 }
 

addparticipantSubmit(){
  this.addormData=this.leadForm.value;
  

  this.dataParticipant={
    lead_genration_id:this.lead_id,
    participant_name: this.addormData.participant_name,
    email_id: this.addormData.email_id,
    // countryss_name: this.addormData.countryss_name,
    contact_number: this.addormData.contact_number,
    program_cost: this.addormData.program_cost,
    discount_percentage: this.addormData.disccount,
    final_fee_after_discount: this.addormData.final_fee_after,
    gst_percentage: this.addormData.gst,
    total_cost_after_taxes: this.addormData.total_cost,
    advance_fee_collected: this.addormData.advance_fee_collected,
    advance_percentage: this.addormData.advane,
    payment_details: this.addormData.payment_details,
    promise_to_pay_date:moment(this.addormData.promis_to_pay_date).format('YYYY-MM-DD')
  }

  
  
  this.leadService.createAddParticipants(this.dataParticipant).subscribe((res:any)=>{
    
    this.toast.success('Add praticipant Created Successfully');
    this.clearInput()
     this.getByAddParticipants();
    
  })

  
}
clearInput() {
  // Clear the input field
  this.leadForm.get('participant_name')?.reset();
  this.leadForm.get('email_id')?.reset();
  this.leadForm.get('contact_number')?.reset();
  this.leadForm.get('Program Cost')?.reset();
  this.leadForm.get('disccount')?.reset();
  this.leadForm.get('final_fee_after')?.reset();
  this.leadForm.get('gst')?.reset();
  this.leadForm.get('total_cost')?.reset();
  this.leadForm.get('advance_fee_collected')?.reset();
  this.leadForm.get('advane')?.reset();
  this.leadForm.get('payment_details')?.reset();
  this.leadForm.get('advane')?.reset();
  // this.leadForm.get('email_id')?.reset();
}
getByAddParticipants(){
  this.leadService.getByAddParticipant(this.lead_id, this.addParticipantId).subscribe((res:any)=>{
    this.rowData=res.data;
    
    
  })
}

  updateBRNumber(e: any) {
    this.allCompanyList.forEach((res: any) => {
      if (res.associated_company == e) {
        this.leadForm.patchValue({
          br_number: res.br_number,
        })
      }
    });
}


calculateNumberOfDays(): void {
  if (this.startDate && this.endDate) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil((timeDiff + 1) / (1000 * 3600 * 24));

      this.leadForm.patchValue({
        no_of_days: numberOfDays,
      });
    } else {
      console.error('Invalid date format');
    }
  }
}






startDateChanged(event: MatDatepickerInputEvent<any>): void {
  this.startDate = event.value;
  this.calculateNumberOfDays();
}

endDateChanged(event: MatDatepickerInputEvent<any>): void {
  this.endDate = event.value;
  this.calculateNumberOfDays();
}

programfilter(e:any){
  const aa = e
  let filteredVariable = this.programOrgVar2.filter((item: any) => aa.includes(item.associated_company));
  this.allCompanyList = filteredVariable
}

programListfilter(e:any){
  const aa = e
  let filteredVariable = this.programListVar2.filter((item: any) => aa.includes(item.product_master_name));
  this.standardList = filteredVariable
}

getAllLeadSource(){
  this.leadService.get_contact().subscribe((res:any)=>{
    this.leadSourceData=res.data;
  })
}
onTemplateChange(e: any) {
  if (e.target.files && e.target.files[0]) {
    const data: FileList = e.target.files;
    this.templateToUpload = data.item(0) || null;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.templatePath = e.target.result;
    };
    reader.readAsDataURL(this.templateToUpload);
  }
}
seeTempletePreview(path:any) {
    if (path) {
      Swal.fire({
        imageUrl: path,
        imageHeight: 250,
        imageAlt: 'Uploaded Document',
        confirmButtonColor: '#8B817D',
        confirmButtonText: 'Ok',
      });
    }
}

  trainingModeSelection(event:any){
    console.log(event.value,"jjjjj");
    if(event.value == 'On Site'){
      this.showTrainingLocation = true;
    }else{
      this.showTrainingLocation = false;
    }
    
  }

}
