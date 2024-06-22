import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPoUpdateComponent } from './approved-po-update.component';

describe('ApprovedPoUpdateComponent', () => {
  let component: ApprovedPoUpdateComponent;
  let fixture: ComponentFixture<ApprovedPoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
