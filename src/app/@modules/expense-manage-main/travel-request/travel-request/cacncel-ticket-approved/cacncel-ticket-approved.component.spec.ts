import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacncelTicketApprovedComponent } from './cacncel-ticket-approved.component';

describe('CacncelTicketApprovedComponent', () => {
  let component: CacncelTicketApprovedComponent;
  let fixture: ComponentFixture<CacncelTicketApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacncelTicketApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CacncelTicketApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
