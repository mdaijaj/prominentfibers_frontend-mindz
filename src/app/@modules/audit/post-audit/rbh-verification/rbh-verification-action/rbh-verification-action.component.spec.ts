import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbhVerificationActionComponent } from './rbh-verification-action.component';

describe('RbhVerificationActionComponent', () => {
  let component: RbhVerificationActionComponent;
  let fixture: ComponentFixture<RbhVerificationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbhVerificationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbhVerificationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
