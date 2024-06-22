import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenHouseRegCreateComponent } from './open-house-reg-create.component';

describe('OpenHouseRegCreateComponent', () => {
  let component: OpenHouseRegCreateComponent;
  let fixture: ComponentFixture<OpenHouseRegCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenHouseRegCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenHouseRegCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
