import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbhVerificationComponent } from './rbh-verification.component';

describe('RbhVerificationComponent', () => {
  let component: RbhVerificationComponent;
  let fixture: ComponentFixture<RbhVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbhVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbhVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
