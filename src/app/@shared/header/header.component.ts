import { AfterViewInit, Component, DoCheck, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { HeadService } from '../services/head.service';
import { AuthService } from 'src/app/@auth/auth-material/auth.service';
import { LeadService } from '../services/lead.service';
import { Router } from '@angular/router';
import { NotificationPendingTaskService } from '../services/notification-pending-task.service';
import * as moment from 'moment';
import { NotificationServiceService } from '../services/notification/notification-service.service';
import { CommunicationNotificationService } from '../services/notification/communication-notification.service';
// import { MyPendingTaskComponent } from '../@modules/hrms/my-pending-task/my-pending-task.component';
interface Attendance{
  employee_id:string,
  punching_date: string,
  punching_time: string,
  punching_status: "OUT"
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  
})
export class HeaderComponent {

  //notification
  @ViewChild('box', { static: true }) box: ElementRef<any>;
  // box:any  = document.getElementById('box');
  leftNavToggle = false;
  down: boolean = true;
  boxHeight: any = '170%';
  boxWidth:any='600px';
  boxOpacity: number = 1;
  @Input()  show: boolean = false;
  condition=this.show;
  check: boolean = true;
  @ViewChild('HRMS') HRMS: ElementRef;
  clicked: boolean = false;
  data: any;
  parse: any;
  name: any;
  image: any;
  imagePath: any = 'assets//icons/icon_DQS/employee.png'
  notExist: any;
  superM: any;
  role_id: any;
  iconBell: any
  Login_user_id: any = localStorage.getItem('signInUser');
  loginUserId: any = JSON.parse(this.Login_user_id).employee_id
  loginUserName: any = JSON.parse(this.Login_user_id).first_name
  // superModule:any=[
  //   {menuName:'HRMS',superModule_link:'hrms',first_Icon:'fas fa-user-tie',last_Icon:'fa fa-chevron-down',superModule_id:1},
  //   {menuName:'Sales & Marketing',superModule_link:'lead',first_Icon:'fa fa-funnel-dollar',last_Icon:'fa fa-chevron-down',superModule_id:2},
  //   {menuName:'LMS',superModule_link:'lms',first_Icon:'fa fa-edit',last_Icon:'fa fa-chevron-down',superModule_id:3},
  //   {menuName:'Administration',superModule_link:'itticket',first_Icon:'fa fa-user-shield',last_Icon:'fa fa-chevron-down',superModule_id:4},
  //   {menuName:'Finance & Accounting',superModule_link:null,first_Icon:'fas fa-calculator',last_Icon:'fa fa-chevron-down',superModule_id:5},
  //   ]
  superModule: any;

  public isScrolled = false;
  public farward1: boolean = true;
  notificationData: any;
  bellNotification: boolean;
  notification_counts: any;
  badges_count: any;
  hidden: string='none';
  menuTrigger: any;
  rowData: any;
  lengths: any;
  rowDataNotifications: any;
  rowDataOther: any;
  constructor(private head: HeadService,
    private _authservice: AuthService,
    private _location: Location,
    public dialog: MatDialog,
    private leade: LeadService,
    private renderer: Renderer2,
    private route: Router,
    private leadService: LeadService,
    private notification: NotificationPendingTaskService,
    private _notification:NotificationServiceService,
    private communition:CommunicationNotificationService,
    
  ) {
    console.log("header menue");
    

    this.data = localStorage.getItem('signInUser');
    this.parse = JSON.parse(this.data);
    

    if (this.parse?.employee_photo) {
      if (this.parse?.employee_photo !== null) {
        let url = this.parse.employee_photo.split('/')
        this.notExist = url[url.length - 1];
        
      }
    } else {
      this.notExist = 'undefined';
      
    }
  }
  notification_count(){
    this._notification.notification_count(this.loginUserId).subscribe((res:any)=>{
      console.log(res,"header notification");
      
      this.notification_counts=res
    this.badges_count=res.data
    if(this.badges_count==0){
      this.hidden='hidden'
    }
    })
  }
  ngOnInit(): void {
    
    
    this.get_notification(this.loginUserId)
    this.notification_count();

    // this.route.url === '/master/hrms/configmaster'
    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);
    console.log(loginUser,"localstoragedata")
    this.role_id = loginUser.role_id

    let sub = this._authservice.getAllAccess_Modules(loginUser.employee_id).subscribe(
      (res) => {
        this.superM = this._authservice.getSuper_Modules().subscribe(
          (res: any) => {
            // 
            this.superModule = res;
            console.log(this.superModule, "gdfgdfgdgf");
            
            this._authservice.setSuperModulesForMaster(this.superModule)
          }
        )
        sub?.unsubscribe();
      }
    )
    this.notificationData = this.notification.dummayForCheck;  
  }
  toggleNotifi() {
    // this.down = false;
    // this.show = !this.show
    const boxElement: HTMLElement = this.box?.nativeElement;
    console.log(boxElement,"boxElement");
    
  }
  onHoverOut(){
    // this.show = !this.show

  }
  notification_read(){

  }
  

  ngAfterViewInit(): void {
    this.onimageLoadOrNot(this.parse?.employee_photo);
    let lg: any = localStorage.getItem('signInUser')
    let loginUser = JSON.parse(lg);

    let sub = this._authservice.getAllAccess_Modules(loginUser.employee_id).subscribe(
      (res) => {
        // 
        this.superM = this._authservice.getSuper_Modules().subscribe(
          (res: any) => {
            // 
            this.superModule = res;
            let btn: any = document.querySelectorAll('.btn');
            btn.forEach(async (e: any) => {
              let isExist = await e.classList;
              if (isExist) {
                if (isExist.contains('active')) {
                  // 
                  this._authservice.setSubSuperModules(Number(e.id));

                }
              }
            })
            this._authservice.setSuperModulesForMaster(this.superModule)
          }
        )
        sub?.unsubscribe();
      }
    )
  }


  toggleLeftNav(val:any){
    if(val){
      document.getElementById('sidebar')?.classList.add('collapsed')
      document.getElementById('sidebar')?.classList.add('manage-sidebar')
      document.getElementsByClassName('router-page')[0]?.classList.add('router-page-remove')
      document.getElementsByClassName('footer')[0]?.classList.add('footer_e')
      
    }
    else{
      document.getElementById('sidebar')?.classList.remove('collapsed')
      document.getElementById('sidebar')?.classList.remove('manage-sidebar')
      document.getElementsByClassName('router-page')[0]?.classList.remove('router-page-remove')
      document.getElementsByClassName('footer')[0]?.classList.remove('footer_e')
    }
  }



  sidebar() {
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      icon: 'warning',
      showCancelButton: true,

      cancelButtonColor: "#8B817D",
      confirmButtonColor: "#f44336",
      confirmButtonText: 'Log out',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.value) {
        this._authservice.logout();
        this.handleEmployee_Attendance(this.parse.employee_id);
        this.head.loginIn.next(false);
        localStorage.removeItem('token');
        localStorage.removeItem('EmpMainId');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }
  openSlide() {
    
  }

  handleEmployee_Attendance(empId:any) {
    let date = new Date();
    let outDate = moment(date).format("YYYY-MM-DD");
    let outTime = moment(date).format('HH:mm');

    let body:Attendance = {
      employee_id: empId,
      punching_date: outDate,
      punching_time: outTime,
      punching_status: "OUT"
    };
    this._authservice.employeeAttendance(body).subscribe(
      (res)=>{
        
      },(err)=>{
        
      }
    )
  }

  backBtn() {
    this._location.back();
  }

  seeProfile(path: any) {
    if (this.notExist === 'undefined' || this.parse.employee_photo === null) {
      Swal.fire({
        imageUrl: this.imagePath,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        imageUrl: path,
        imageHeight: 250,
        imageAlt: 'Profile Image',
        confirmButtonColor: "#8B817D",
        confirmButtonText: 'Ok',
      })
    }
  };
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    const element: any = document.querySelector(".header");
    let position = element?.offsetTop;
    if (position > 50) {
      this.isScrolled = true;
      this.leade.setColor(this.isScrolled);
    } else {
      this.isScrolled = false;
      this.leade.setColor(this.isScrolled);
    };
  };
  ConfigureMaster(className: string) {
    // 
    this.renderer.removeClass(this.HRMS.nativeElement, className);
    // this.head.loginIn.next(false);
    this.head.nav.subscribe(data => {
      this.farward1 = data;
      this.head.loginIn.next(true);
      
    })
  }
  hrmsActive(className: any) {
    this.renderer.addClass(this.HRMS.nativeElement, className);

  }
  onimageLoadOrNot(image: any) {
    let img: any = document.querySelector('.profileImg');
    if (img.complete) {
      
    } else {
      // img.addEventListener('load', ()=>{
      //   
      // })
      img.addEventListener('error', () => {
        
        this.parse.employee_photo = this.imagePath;
      })
    }
  }
  clickOnNavIcon() {

  }
  getSuperModuleId(menuId: any) {
    this._authservice.setSubSuperModules(Number(menuId))
  }
  reloadCurrentRoute() {
    let currentUrl = this.route.url;
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([currentUrl]);
    });
  }
  ngOnDestroy(): void {
    this.superM?.unsubscribe();
  }
  myPendingTask(e: any) {
    this.notification.notifications = true
    this.bellNotification = true
  }
  triggerFunction1(){
    this.show=false
    // const dialogRef = this.dialog.open(AllNotificationComponent, {
    //   });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    // this.communition.triggerFunction();
    // const data={
    //   status:'INACTIVE'
    // }
    // this._notification.edit_notification(this.loginUserId,data).subscribe((res)=>{
    //   console.log(res,"res check");
    // })
    // setTimeout(() => {
    // this.notification_count();
    // }, 100);
    // this.toggleNotifi()
  }
  nav(e:any){
    e.stopPropagation();

  }
  triggerFunction(e:any){
    e.stopPropagation();
    this.show=!this.show
    // const dialogRef = this.dialog.open(AllNotificationComponent, {
    //   });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    // this.communition.triggerFunction();
    console.log(e,"notification");
    const data={
      status:'INACTIVE'
    }
    this._notification.edit_notification(this.loginUserId,data).subscribe((res)=>{
      console.log(res,"res check");
    })
    setTimeout(() => {
    this.notification_count();
    }, 100);
    this.toggleNotifi()
  }
  scrollLeft(){
    let container = document.querySelector('.right-side-image');
    container?.scrollBy(-350,0) 
  }
  scrollRight(){
    let container = document.querySelector('.right-side-image');
    container?.scrollBy(350,0);   
  }

  //notificaiton
  get_notification(id: any) {
    this._notification.get_notification(id).subscribe((res: any) => {
      const notifications:any = [];
      const otherData:any = [];
  
      res.data.forEach((item: any) => {
        if (Array.isArray(item)) {
          // If the item is an array, it's a notification group
          notifications.push(...item);
        } else {
          // Otherwise, it's other data
          otherData.push(item);
        }
      });
  
      this.rowDataNotifications = notifications.reverse();
      this.rowDataOther = otherData;
      this.lengths = this.rowDataNotifications.length + this.rowDataOther.length;
    });
  }
  

}
