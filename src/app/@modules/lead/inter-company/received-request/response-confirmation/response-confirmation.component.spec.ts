import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseConfirmationComponent } from './response-confirmation.component';

describe('ResponseConfirmationComponent', () => {
  let component: ResponseConfirmationComponent;
  let fixture: ComponentFixture<ResponseConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
