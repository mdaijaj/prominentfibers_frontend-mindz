import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTravelTicketComponent } from './download-travel-ticket.component';

describe('DownloadTravelTicketComponent', () => {
  let component: DownloadTravelTicketComponent;
  let fixture: ComponentFixture<DownloadTravelTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadTravelTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTravelTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
