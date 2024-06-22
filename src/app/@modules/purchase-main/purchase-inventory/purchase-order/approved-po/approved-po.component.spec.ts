import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPoComponent } from './approved-po.component';

describe('ApprovedPoComponent', () => {
  let component: ApprovedPoComponent;
  let fixture: ComponentFixture<ApprovedPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
