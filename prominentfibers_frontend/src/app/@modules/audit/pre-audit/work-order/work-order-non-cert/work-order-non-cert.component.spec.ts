import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderNonCertComponent } from './work-order-non-cert.component';

describe('WorkOrderNonCertComponent', () => {
  let component: WorkOrderNonCertComponent;
  let fixture: ComponentFixture<WorkOrderNonCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderNonCertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderNonCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
