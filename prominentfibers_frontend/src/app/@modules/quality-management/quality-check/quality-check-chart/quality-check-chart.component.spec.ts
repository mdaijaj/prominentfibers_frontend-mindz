import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCheckChartComponent } from './quality-check-chart.component';

describe('QualityCheckChartComponent', () => {
  let component: QualityCheckChartComponent;
  let fixture: ComponentFixture<QualityCheckChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityCheckChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityCheckChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
