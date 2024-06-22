import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierOutwardListComponent } from './courier-outward-list.component';

describe('CourierOutwardListComponent', () => {
  let component: CourierOutwardListComponent;
  let fixture: ComponentFixture<CourierOutwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierOutwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierOutwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
