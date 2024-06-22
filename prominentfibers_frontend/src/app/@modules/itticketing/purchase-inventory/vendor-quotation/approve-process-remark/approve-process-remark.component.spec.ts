import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProcessRemarkComponent } from './approve-process-remark.component';

describe('ApproveProcessRemarkComponent', () => {
  let component: ApproveProcessRemarkComponent;
  let fixture: ComponentFixture<ApproveProcessRemarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveProcessRemarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveProcessRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
