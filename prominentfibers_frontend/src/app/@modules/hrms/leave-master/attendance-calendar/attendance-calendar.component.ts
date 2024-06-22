import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  CustomRenderingStore,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AttendPopupComponent } from './attend-popup/attend-popup.component';
import { LeadService } from 'src/app/@shared/services/lead.service';
import { MatDialog } from '@angular/material/dialog';
import { LmsServiceService } from 'src/app/@shared/services/lms-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HrServiceService } from 'src/app/@shared/services/hr-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as XLSX from 'xlsx';
import { RbacMasterService } from 'src/app/@shared/services/rbac-master.service';

interface calendarEvent {
  id: string,
  title: string,
  date: Date,
  backgroundColor: string
}

interface widthDuratoion extends calendarEvent {
  duration: string
}


@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html',
  styleUrls: ['./attendance-calendar.component.scss'],
})
export class AttendanceCalendarComponent {
  eventName: any;
  eventTime: any;
  calendarVisible = true;
  currentEvents: EventApi[] = [];
  colorBox: any[] = ['#d50000', '#e67c73', '#f4511e', '#f6bf26', '#33b679', '#0b8043', '#039be5', '#3f51b5', '#7986cb', '#8e24aa']

  allEvent: calendarEvent[] = [];
  eventsPromise: any = [];
  allEventWidthDuration: widthDuratoion[] = [];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  EmpListData: any;
  screenOnOffData: any;
  selectedEmp:any;
  searchVal:any = '';
  all_attendence:any;
  assignAction:any;
  @ViewChild('calendar', { static: true }) calendar: FullCalendarComponent

  constructor(private changeDetector: ChangeDetectorRef, private _rbackService:RbacMasterService, private hrServies: HrServiceService, private _lead: LeadService, private route: Router, public dialog: MatDialog, private toaster: ToastrService, private _lmsService: LmsServiceService) { }

  ngOnInit(): void {
    // this.getAllEvent();
    this.getEmpList()
    
    this.get_All_InOut_Attendance();
  };

  getEmpList() {
    this.hrServies.getAllEmp().subscribe((res: any) => {
      this.EmpListData = res.data;
      
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.assignAction = this._rbackService.accessAssignAction();
    },200);
  };

  ngDoCheck(): void {
    this.eventName = document.getElementById('swal-input1');
    this.eventTime = document.getElementById('swal-input2');
  };

  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [],
    // eventBackgroundColor: 'yellow', 
    // eventTextColor: 'black',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  async handleDateSelect(selectInfo: DateSelectArg) {

    //  
    //  

    // 


    let newDate = moment(new Date()).format("MM/DD/YYYY");
    let date = new Date(selectInfo.startStr);
    let selDate = moment(date).format("YYYY-MM-DD");

    let today = new Date(newDate);
    // let .selectedEmp
    

    if(!this.selectedEmp){
      this.toaster.warning('Please select employee')
    }

    if (this.screenOnOffData && this.screenOnOffData.length !== 0) {
      let filter = this.screenOnOffData.filter((d: any) => d.screen_off_date === selDate && d.screen_on_date === selDate);
      
      this.openEventDetailsPopup(filter)
    }

    // if (today > selectDate) {
    //   this.toaster.warning(`You are not able to add event on ${moment(date).format("DD/MM/YYYY")} Date`, 'Select Valid Date');
    //   return
    // }

    // const { value: title } = await Swal.fire({
    //   title: 'Enter a new title for your event',
    //   showCancelButton: true,
    //   confirmButtonText: 'Create',
    //   confirmButtonColor: '#8B817D',
    //   cancelButtonColor: 'rgb(244, 67, 54)',
    //   html:
    //     '<input type="text" id="swal-input1" class="swalInput" style=" border: 1px solid #959595; padding-left: 10px; border-radius: 5px; outline: none; height: 40px;margin-right: 10px; width: 90%;" placeholder="Event name">',

    //   focusConfirm: false,
    //   preConfirm: () => {
    //     if (this.eventName.value === '') {
    //       this.toaster.error('Event name should not be blank');
    //       return false;
    //     } else if (this.eventName.value.length > 30) {
    //       this.toaster.error('Event name should contain maximum 30 length');
    //       return false;
    //     } else{
    //         return this.eventName.value;
    //     }
    //   },
    // })

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    // 
    // if (title) {

    //   let data:any = {
    //     title: title,
    //     date: date,
    //     color:this.RandomColorCode(),
    //     duration:'30 Minutes'
    //   }

    // this.createEvent(data, calendarApi, title, selectInfo);
    //   
    // };

  }

  getAmPmStartTime(date: any) {
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  getAmPmEndTime(date: any) {
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  handleEventClick(clickInfo: EventClickArg) {
    
    // 
    // this.openEventDetailsPopup(clickInfo.event);
    let isShow = false;
    let box: any = document.querySelector('.fc-more-popover');
    if (box) {
      box.style.display = 'none';
    };

    let val = clickInfo.event.title.split('/-');

    // Swal.fire({
    //   title: `Are you sure to delete this event`,
    //   text: `Event name : ${val[0]} ${val[1] ? ', Time : ' + val[1] : ''}`,
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonColor: '#be0000',
    //   cancelButtonColor: '#8B817D',
    //   confirmButtonText: 'Delete'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     clickInfo.event.remove();
    //     this.toaster.success('Event deleted successfully')
    //   };
    // })
  }

  handleEvents(events: any) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  };

  genrateRandomColorCode() {
    let letters = '0123456789ABCDEF';
    let colorCode = '#';
    for (let i = 0; i < 6; i++) {
      colorCode += letters[Math.floor(Math.random() * 16)];
    }
    return colorCode;
  };

  RandomColorCode() {
    let num = Math.floor(Math.random() * 10)
    return this.colorBox[num]
  };



  openEventDetailsPopup(data: any) {
    const dialogRef = this.dialog.open(AttendPopupComponent, {
      width: '400px',
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }

  // server action for upcomminy courses ----------------------------------------------------------------
  createEvent(data: any, calendarApi: any, title: any, selectInfo: any) {
    this._lmsService.createEvent(data).subscribe(
      (res) => {
        
        calendarApi.addEvent({
          // id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        });
        this.toaster.success('Event created successfully')
        this.reloadCurrentRoute();

      }, (err) => {
        
        this.toaster.error('Someting went wrong please try again', 'Error Message')
      });
  };



  // getAllEvent() {

  //   this._lmsService.getAllEvent().subscribe(
  //     (res) => {
  //       
  //       let data:any = res.result

  //       for(let i=0; i<data.length; i++){
  //         this.allEvent.push({
  //           id:String(data[i].id),
  //           title:data[i].title,
  //           date: new Date(data[i].date),
  //           color:data[i].color
  //         })

  //         this.allEventWidthDuration.push({
  //           id:String(data[i].id),
  //           title:data[i].title,
  //           date: new Date(data[i].date),
  //           color:data[i].color,
  //           duration:data[i]?.duration
  //         })
  //       }
  //       this.calendarOptions.events = this.allEvent;

  //       
  //       
  //     }, (err) => {
  //       
  //     });
  // };

  getSingleEvent(id: any) {
    this._lmsService.getSingleEvent(id).subscribe(
      (res) => {
        
      }, (err) => {
        
      });
  };



  getCalenderById(id: any) {
    if (id) {
      this.selectedEmp = id
      this.get_Attendance(id)
      this.getAll_screen_On_Off(id)
    }
  }

  getAll_screen_On_Off(id: any) {
    this.hrServies.getAll_screen_On_Off(id).subscribe(
      (res) => {
        this.screenOnOffData = res.data;
        
      }, (err) => {
        
      }
    )
  }

  get_Attendance(id: any) {
    this.hrServies.get_Attendance(id).subscribe(
      (res) => {
        
        

        let data: any = res.data;

        for (let i = 0; i < data.length; i++) {
          let obj: any = {
            id: String(data[i].attendance_calender_id),
            title: data[i].punching_status,
            date: new Date(`${data[i].punching_date} ${data[i].punching_time}`),
          }
          if (obj.title === "IN") {
            obj.backgroundColor = "#388e3c";
            obj.title = `--${data[i].punching_status}`
          } else if (obj.title === "OUT") {
            obj.backgroundColor = '#fc685f';
            obj.title = `--${data[i].punching_status}`
          }
          this.allEvent.push(obj);

          let cl = this.calendar.getApi().view.calendar;
          cl.unselect();
          // add events
          setTimeout(() => {
            cl.addEvent(obj);
          }, 200);
        }

        let calendarApi = this.calendar.getApi();
        // remove events
        setTimeout(() => {
          calendarApi.removeAllEvents()
        }, 100);

        this.calendarOptions.events = this.allEvent;

        this.calendarOptions.eventColor = this.colorBox[Math.floor(Math.random() * (this.colorBox.length - 1 + 1) + 1)]
        
      }, (err) => {
        
      });

  }

  onBtnExportDataAsExcel(){
    if(this.all_attendence && this.all_attendence.length !== 0){
      this.ExportDataInExcelFormate(this.all_attendence);
    }else{
      this.toaster.error('Data not found');
    }
  }

  ExportDataInExcelFormate(jsonData:any) {
    let filename = 'All_in_out_attendence.xlsx';
    let data = jsonData;
    let ws = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "People");
    XLSX.writeFile(wb, filename);
  };

  get_All_InOut_Attendance(){
    this.hrServies.get_All_InOut_Attendance().subscribe(
      (res)=>{
        
        this.all_attendence = res.data;
      },(err)=>{
        
      }
    )
  };

}
