import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseTrainingCreateComponent } from './open-house-training-create.component';

describe('OpenHouseTrainingCreateComponent', () => {
  let component: OpenHouseTrainingCreateComponent;
  let fixture: ComponentFixture<OpenHouseTrainingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHouseTrainingCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHouseTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
