import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingMaterialListComponent } from './training-material-list.component';

describe('TrainingMaterialListComponent', () => {
  let component: TrainingMaterialListComponent;
  let fixture: ComponentFixture<TrainingMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingMaterialListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
