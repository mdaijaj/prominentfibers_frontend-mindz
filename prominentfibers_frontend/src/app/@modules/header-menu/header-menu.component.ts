import { Component, OnInit } from '@angular/core';
import { HeadService } from 'src/app/@shared/services/head.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit{
  clicked: boolean = false;
  constructor(private head:HeadService){
  }
    ngOnInit(): void {
      this.head.clicked.subscribe(data=>{
        this.clicked = data;
      })
    }
}
