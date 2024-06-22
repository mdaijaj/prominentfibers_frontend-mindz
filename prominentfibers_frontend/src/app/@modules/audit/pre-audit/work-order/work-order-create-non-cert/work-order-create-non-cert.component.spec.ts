import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderCreateNonCertComponent } from './work-order-create-non-cert.component';

describe('WorkOrderCreateNonCertComponent', () => {
  let component: WorkOrderCreateNonCertComponent;
  let fixture: ComponentFixture<WorkOrderCreateNonCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkOrderCreateNonCertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrderCreateNonCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
