import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedActionComponent } from './approved-action.component';

describe('ApprovedActionComponent', () => {
  let component: ApprovedActionComponent;
  let fixture: ComponentFixture<ApprovedActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
