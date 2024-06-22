import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseComponent } from './open-house-training.component';

describe('OpenHouseComponent', () => {
  let component: OpenHouseComponent;
  let fixture: ComponentFixture<OpenHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
