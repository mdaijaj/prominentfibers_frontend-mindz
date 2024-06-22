import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePolicyCreateComponent } from './leave-policy-create.component';

describe('LeavePolicyCreateComponent', () => {
  let component: LeavePolicyCreateComponent;
  let fixture: ComponentFixture<LeavePolicyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavePolicyCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavePolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
