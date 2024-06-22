import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierInwardComponent } from './courier-inward.component';

describe('CourierInwardComponent', () => {
  let component: CourierInwardComponent;
  let fixture: ComponentFixture<CourierInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierInwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
