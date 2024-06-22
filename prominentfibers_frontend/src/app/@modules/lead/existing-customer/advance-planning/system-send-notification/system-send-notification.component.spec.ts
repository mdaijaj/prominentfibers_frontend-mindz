import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSendNotificationComponent } from './system-send-notification.component';

describe('SystemSendNotificationComponent', () => {
  let component: SystemSendNotificationComponent;
  let fixture: ComponentFixture<SystemSendNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSendNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSendNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
