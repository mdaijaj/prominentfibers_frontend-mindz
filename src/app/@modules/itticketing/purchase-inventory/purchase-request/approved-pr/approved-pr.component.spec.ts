import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPrComponent } from './approved-pr.component';

describe('ApprovedPrComponent', () => {
  let component: ApprovedPrComponent;
  let fixture: ComponentFixture<ApprovedPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
