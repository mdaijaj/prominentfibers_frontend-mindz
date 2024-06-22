import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsssumptionCreateComponent } from './asssumption-create.component';

describe('AsssumptionCreateComponent', () => {
  let component: AsssumptionCreateComponent;
  let fixture: ComponentFixture<AsssumptionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsssumptionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsssumptionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
