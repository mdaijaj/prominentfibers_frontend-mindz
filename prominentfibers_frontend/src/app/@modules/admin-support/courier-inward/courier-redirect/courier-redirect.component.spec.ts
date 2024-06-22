import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierRedirectComponent } from './courier-redirect.component';

describe('CourierRedirectComponent', () => {
  let component: CourierRedirectComponent;
  let fixture: ComponentFixture<CourierRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
