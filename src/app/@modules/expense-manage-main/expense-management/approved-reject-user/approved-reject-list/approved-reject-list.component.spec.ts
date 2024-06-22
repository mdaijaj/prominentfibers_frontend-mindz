import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectListComponent } from './approved-reject-list.component';

describe('ApprovedRejectListComponent', () => {
  let component: ApprovedRejectListComponent;
  let fixture: ComponentFixture<ApprovedRejectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRejectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedRejectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
