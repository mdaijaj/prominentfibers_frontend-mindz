import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { SalesRequestService } from 'src/app/@shared/services/salesrequest/sales-request.service';

@Component({
  selector: 'app-bookauditor',
  templateUrl: './bookauditor.component.html',
  styleUrls: ['./bookauditor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookauditorComponent {
  salseRequest: any;
  auditorName: any;
  GetAllSalesRequest: any;
  panelOpenState = false;
  SR_id: any;
  saleRequestData: any;
  RequestAuditorList: any;
  leadauditorData: any;
  traineeauditorData: any;
  technicalAuditorData: any;
  candidateAuditorData: any;
  witnessAuditorData: any;
  co_auditorData: any;
  parentCompanyData: any;
  getLocation: any;
  suggested_auditor_list:any = []
  constructor(
    private salesRequest_: SalesRequestService,
    private fb: FormBuilder,
    private route: Router,
    private toast: ToastrService,
    private activeroute: ActivatedRoute
  ) {
    this.activeroute.queryParams.subscribe((res: any) => {
      this.SR_id = res.SR_id
      this.salesRequest(this.SR_id)
      this.getLocationID(this.SR_id);
    })
    this.salseRequest = this.fb.group({
      request_audit_date: new FormControl(null, Validators.required),
      site: new FormControl(null, Validators.required),
      specific_auditor: new FormControl(null, Validators.required),
      client_name: new FormControl(),
      City: new FormControl(),
      service: new FormControl(),
      program: new FormControl(),
      mandays: new FormControl(),
      country: new FormControl(),
      eaCode: new FormControl(),
      expected_date: new FormControl(),
      remarksSale: new FormControl(),
      br_number: new FormControl(),
      state: new FormControl(),
      leadAuditor: new FormControl(),
      coAuditor: new FormControl(),
      traineeAuditor: new FormControl(),
      technicalAuditor: new FormControl(),
      candidate: new FormControl(),
      witness: new FormControl(),
      leadAuditor_bookedDate: new FormControl(null),
      coAuditor_bookedDate: new FormControl(null),
      traineeAuditor_bookedDate: new FormControl(null),
      technicalAuditor_bookedDate: new FormControl(null),
      candidateAuditor_bookedDate: new FormControl(null),
      witnessAuditor_bookedDate: new FormControl(null),
      suggested_auditor_list:new FormControl(null),
    })
  }

  ngOnInit() {
    this.allAuditor();
    // this.allAuditor();
  }
  salesRequest(id: any) {
    this.salesRequest_.getbyID_SalesRequest(id).subscribe((res: any) => {
      console.log(res,"responsive");

      this.parentCompanyData = res.data[0]
      this.saleRequestData = res.data[0].sales_request;
      if(this.saleRequestData){
        this.saleRequestData.specific_auditor.forEach((element:any) => {
          this.suggested_auditor_list.push(element.name)
        });
      }
      this.RequestAuditorList = res.data[0].sales_request.specific_auditor;
      console.log(this.saleRequestData, "salesRequest DS");
      this.salseRequest.patchValue({
        request_audit_date:moment(this.saleRequestData.request_audit_date).format('DD/MM/YYYY'),
        site: this.saleRequestData.site,
        mandays: this.saleRequestData.man_days,
        country: this.saleRequestData.Country,
        state: this.saleRequestData.State,
        City: this.saleRequestData.City,
        service: this.saleRequestData.service,
        eaCode: this.saleRequestData.eaCode,
        expected_date:moment(this.saleRequestData.expected_date).format('DD/MM/YYYY'), 
        remarksSale: this.saleRequestData.remarksSale,
        program: this.saleRequestData.program,
        suggested_auditor_list:this.suggested_auditor_list
      })
    })
  }
  getLocationID(id: any) {
    this.salesRequest_.getLocationGetbyID(id).subscribe((res: any) => {
      this.getLocation = res.data;
      console.log(this.getLocation,"getlo");
      
  })
  }
  getAuditor() {
    this.salesRequest_.getAllData().subscribe((res: any) => {
      this.GetAllSalesRequest = res.data
      console.log(this.GetAllSalesRequest, "for listing");
    })
  }

  submitForm() {

    console.log(this.salseRequest);
    console.log(this.leadauditorData, "lead audit");
    const data = {
      leadauditorData: this.leadauditorData,
      co_auditorData: this.co_auditorData,
      traineeauditorData: this.traineeauditorData,
      technicalAuditorData: this.technicalAuditorData,
      candidateAuditorData: this.candidateAuditorData,
      witnessAuditorData: this.witnessAuditorData,
      sales_request_id: this.SR_id,
      lead_genration_id: this.parentCompanyData.sales_request.lead_genration_id,
      new_location_id: this.parentCompanyData.sales_request.new_location_id,
      sales_request_state: this.parentCompanyData.sales_request.sales_request_state,
      status: 'Auditor Booked'
    }
    data.leadauditorData.Auditor_bookedDate = this.salseRequest.value.leadAuditor_bookedDate;
    data.leadauditorData.location = this.getLocation;
    data.traineeauditorData.Auditor_bookedDate = this.salseRequest.value.traineeAuditor_bookedDate;
    data.traineeauditorData.location = this.getLocation
    data.technicalAuditorData.Auditor_bookedDate = this.salseRequest.value.technicalAuditor_bookedDate;
    data.technicalAuditorData.location = this.getLocation
    data.candidateAuditorData.Auditor_bookedDate = this.salseRequest.value.candidateAuditor_bookedDate;
    data.candidateAuditorData.location = this.getLocation
    data.witnessAuditorData.Auditor_bookedDate = this.salseRequest.value.witnessAuditor_bookedDate;
    data.witnessAuditorData.location = this.getLocation
    for (let a = 0; a < data.co_auditorData.length; a++) {
      data.co_auditorData[a].coAuditor_bookedDate = this.salseRequest.value.coAuditor_bookedDate;
      data.co_auditorData[a].location = this.getLocation;
      //getLocation
    }
    console.log(data, "");
    this.salesRequest_.AuditorBooking(data).subscribe((res: any) => {
      console.log("ok");
      this.toast.success('Auditor Booked Successfully...')
      this.route.navigate(['master/audit/audit-management/sales-request'])
    }),
      (error: any) => {
        this.toast.error('Somthing Wents wrong..')
      }
  }
  cancel() {
    window.location.reload();
  }
  salesChange() {
  }
  allAuditor() {
    this.salesRequest_.Auditorlist().subscribe((res: any) => {
      this.auditorName = res.data
      console.log(this.auditorName, "auditorName");
    })
  }
  wnerClick(e: any) {
  }
  auditorFunction(e: any, typeAuditor: any) {
    console.log(this.auditorName, "auditorName");
    console.log(typeAuditor, 'typeAuditor');
    console.log(e.value, "auditor");
    let filterAuditor = this.auditorName.filter((res: any) => res.audit_qualification_id == e.value)
    let data = {
      audit_qualification_id: filterAuditor[0].audit_qualification_id,
      auditor_first_name: filterAuditor[0].auditor_first_name,
    }
    switch (typeAuditor) {
      case 'leadAuditor':
        console.log(data, "data>>>>>>>");
        this.leadauditorData = data
        break;
      case 'traineeAuditor':
        console.log(data, "data>>>>>>>");
        this.traineeauditorData = data
        break;
      case 'technicalAuditor':
        console.log(data, "data>>>>>>>");
        this.technicalAuditorData = data
        break;
      case 'candidate':
        console.log(data, "data>>>>>>>");
        this.candidateAuditorData = data
        break;
      case 'witness':
        console.log(data, "data>>>>>>>");
        this.witnessAuditorData = data
        break;
      default:
        console.log("ok");
    }

  }
  auditorFunction1(e: any, typeAuditor: any) {
    const userdatamatch = e.value;
    const filteredData = this.auditorName
      .filter((item: any) => userdatamatch.includes(item.audit_qualification_id))
      .map((item: any) => {
        const { audit_qualification_id, auditor_first_name } = item;
        return { audit_qualification_id, auditor_first_name };
      });
    console.log(filteredData, "filteredData");
    this.co_auditorData = filteredData
  }
  datesArray: Date[] = [
    new Date('2023-08-25'),
    new Date('2023-08-28'),
    new Date('2023-08-30'),
  ];
  FromDate: string;
  toDate: string;

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  // day = this.now.getDay();
  date = this.now.getDate();
  maxDate = moment({
    year: this.year + 100,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  minDate = moment({
    year: this.year - 0,
    month: this.month,
    date: this.date,
  }).format('YYYY-MM-DD');
  fromDate(e: any) {
    this.FromDate = moment(e.value).format('YYYY-MM-DD');
  }
  ToDate(e: any) {
    this.toDate = moment(e.value).format('YYYY/MM/DD');
  }
  //for Leadauditor
  lead_cal1: any[] = []
  event: any = [];
  isSelected1: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal1.find((x: any) => x == date) ? "selected" : null;
  };
  select1(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal1.findIndex(x => x == date);
    if (index < 0) this.lead_cal1.push(date);
    else this.lead_cal1.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal1, " ");
    this.salseRequest.get('leadAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      leadAuditor_bookedDate: this.lead_cal1
    })
  }

  //co-auditor
  lead_cal2: any[] = []
  isSelected2: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal2.find((x: any) => x == date) ? "selected" : null;
  };
  select2(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal2.findIndex(x => x == date);
    if (index < 0) this.lead_cal2.push(date);
    else this.lead_cal2.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal2, " ");
    this.salseRequest.get('coAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      coAuditor_bookedDate: this.lead_cal2
    })
  }
  //co-auditor
  lead_cal3: any[] = []
  isSelected3: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal3.find((x: any) => x == date) ? "selected" : null;
  };
  select3(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal3.findIndex(x => x == date);
    if (index < 0) this.lead_cal3.push(date);
    else this.lead_cal3.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal3, " ");
    this.salseRequest.get('traineeAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      traineeAuditor_bookedDate: this.lead_cal3
    })
  }
  //Technical-auditor
  lead_cal4: any[] = []
  isSelected4: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal4.find((x: any) => x == date) ? "selected" : null;
  };
  select4(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal4.findIndex(x => x == date);
    if (index < 0) this.lead_cal4.push(date);
    else this.lead_cal4.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal4, " ");
    this.salseRequest.get('technicalAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      technicalAuditor_bookedDate: this.lead_cal4
    })
  }
  //candidate-auditor
  lead_cal5: any[] = []
  isSelected5: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal5.find((x: any) => x == date) ? "selected" : null;
  };
  select5(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal5.findIndex(x => x == date);
    if (index < 0) this.lead_cal5.push(date);
    else this.lead_cal5.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal5, " ");
    this.salseRequest.get('candidateAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      candidateAuditor_bookedDate: this.lead_cal5
    })
  }
  //witness-auditor
  lead_cal6: any[] = [
  ]
  isSelected6: any = (event: any) => {
    console.log(event, "event");
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    return this.lead_cal6.find((x: any) => x == date) ? "selected" : null;
  };
  select6(event: any, calendar: any) {
    console.log(event);
    console.log(calendar);
    const date = event.getFullYear() + "-" + ("00" + (event.getMonth() + 1)).slice(-2) + "-" + ("00" + event.getDate()).slice(-2);
    const index = this.lead_cal6.findIndex(x => x == date);
    if (index < 0) this.lead_cal6.push(date);
    else this.lead_cal6.splice(index, 1);
    calendar.updateTodaysDate();
    console.log(this.lead_cal6, " ");
    this.salseRequest.get('witnessAuditor_bookedDate').reset();
    this.salseRequest.patchValue({
      witnessAuditor_bookedDate: this.lead_cal6
    })
  }


}
