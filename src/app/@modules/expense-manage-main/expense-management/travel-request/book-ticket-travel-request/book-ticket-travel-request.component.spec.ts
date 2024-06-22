import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketTravelRequestComponent } from './book-ticket-travel-request.component';

describe('BookTicketTravelRequestComponent', () => {
  let component: BookTicketTravelRequestComponent;
  let fixture: ComponentFixture<BookTicketTravelRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTicketTravelRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTicketTravelRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
