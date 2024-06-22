import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseListComponent } from './open-house-training-list.component';

describe('OpenHouseListComponent', () => {
  let component: OpenHouseListComponent;
  let fixture: ComponentFixture<OpenHouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHouseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
