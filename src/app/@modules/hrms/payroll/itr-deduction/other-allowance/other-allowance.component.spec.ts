import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAllowanceComponent } from './other-allowance.component';

describe('OtherAllowanceComponent', () => {
  let component: OtherAllowanceComponent;
  let fixture: ComponentFixture<OtherAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherAllowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
