import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuoteListComponent } from './send-quote-list.component';

describe('SendQuoteListComponent', () => {
  let component: SendQuoteListComponent;
  let fixture: ComponentFixture<SendQuoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQuoteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
