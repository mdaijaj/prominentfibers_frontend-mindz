import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierOutwardComponent } from './courier-outward.component';

describe('CourierOutwardComponent', () => {
  let component: CourierOutwardComponent;
  let fixture: ComponentFixture<CourierOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierOutwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
