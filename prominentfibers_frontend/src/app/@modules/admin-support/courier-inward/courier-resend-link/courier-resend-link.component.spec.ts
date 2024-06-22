import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierResendLinkComponent } from './courier-resend-link.component';

describe('CourierResendLinkComponent', () => {
  let component: CourierResendLinkComponent;
  let fixture: ComponentFixture<CourierResendLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierResendLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierResendLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
