import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseRegListComponent } from './open-house-reg-list.component';

describe('OpenHouseRegListComponent', () => {
  let component: OpenHouseRegListComponent;
  let fixture: ComponentFixture<OpenHouseRegListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHouseRegListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHouseRegListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
