import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectCreateComponent } from './approved-reject-create.component';

describe('ApprovedRejectCreateComponent', () => {
  let component: ApprovedRejectCreateComponent;
  let fixture: ComponentFixture<ApprovedRejectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRejectCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRejectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
