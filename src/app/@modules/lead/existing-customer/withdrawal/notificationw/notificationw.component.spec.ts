import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationwComponent } from './notificationw.component';

describe('NotificationwComponent', () => {
  let component: NotificationwComponent;
  let fixture: ComponentFixture<NotificationwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
