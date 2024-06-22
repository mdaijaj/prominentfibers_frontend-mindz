import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProcessComponent } from './approve-process.component';

describe('ApproveProcessComponent', () => {
  let component: ApproveProcessComponent;
  let fixture: ComponentFixture<ApproveProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
