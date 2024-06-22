import { Component,HostListener , DoCheck, OnInit,ViewChild, Renderer2, ElementRef  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from 'ag-grid-community';
import { Observable, pipe } from 'rxjs';
import { HeadService } from './@shared/services/head.service';
import { HeaderComponent } from './@shared/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  @ViewChild('header', { static: true }) header: HeaderComponent;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn$!: Observable<boolean>;
  constructor( private head: HeadService, private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
    ) {}
  ngOnInit(): void {
    this.isLoggedIn$ = this.head?.isLoggedIn;
  }

  ngDoCheck(): void {
    // console.clear()
  }
  onClick(event:any) {
    // console.log(event,"event");
    const a=this.renderer.addClass(this.el.nativeElement, 'highlight');
    // console.log(this,"dddd")
    // this.header.triggerFunction1();
    // Add your code here
    // console.log('Window or page clicked!');
    
    // this.header.triggerFunction1();
  }
  onClick22() {
    // Add your code here
    // console.log('againdddddddddd');
    // this.header.triggerFunction1();
  }
  @HostListener('window:click', ['$event'])
  onWindowClick(event: Event): void {
    this.onClick(event);
  }
}
