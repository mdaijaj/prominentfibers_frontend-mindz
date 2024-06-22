import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierInwardListComponent } from './courier-inward-list.component';

describe('CourierInwardListComponent', () => {
  let component: CourierInwardListComponent;
  let fixture: ComponentFixture<CourierInwardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierInwardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierInwardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
