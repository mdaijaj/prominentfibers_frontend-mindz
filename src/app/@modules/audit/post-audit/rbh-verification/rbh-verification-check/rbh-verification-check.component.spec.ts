import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbhVerificationCheckComponent } from './rbh-verification-check.component';

describe('RbhVerificationCheckComponent', () => {
  let component: RbhVerificationCheckComponent;
  let fixture: ComponentFixture<RbhVerificationCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbhVerificationCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbhVerificationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
