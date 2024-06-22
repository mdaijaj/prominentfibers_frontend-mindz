import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommunicationNotificationService } from 'src/app/@shared/services/notification/communication-notification.service';
@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.scss']
})
export class AllNotificationComponent {
  @ViewChild('box', { static: true }) box: ElementRef<any>;
  // box:any  = document.getElementById('box');
  down: boolean = true;
  boxHeight: number = 510;
  boxOpacity: number = 1;
  show: boolean = false;
  check: boolean = true;
  badges_count: number;
  constructor(private renderer: Renderer2, private el: ElementRef,
    private communication: CommunicationNotificationService) {
  }
  ngOnInit() {
    this.badges_count = 4
    this.communication.trigger$.subscribe((value) => {
      // if (value) {
        this.toggleNotifi();
      // }
    });
  }
  triggerFunction(e: any) {

  }

  toggleNotifi() {
    // this.down = false;
    this.show = !this.show
    // const boxElement: HTMLElement = this.box?.nativeElement;
    // console.log(boxElement,"boxElement");
    
    if (this.down) {
      // boxElement.style.height = '0px' || undefined;
      // boxElement.style.opacity = '0' || undefined;
      this.down = false;
    } else {
      // boxElement.style.height = '150px' || undefined;
      // boxElement.style.overflow = 'hidden' || undefined;
      // boxElement.style.width = '310px' || undefined;
      // boxElement.style.opacity = '1' || undefined;
      this.down = true;
    }
  }
}
