import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnReportActionComponent } from './grn-report-action.component';

describe('GrnReportActionComponent', () => {
  let component: GrnReportActionComponent;
  let fixture: ComponentFixture<GrnReportActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnReportActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrnReportActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
