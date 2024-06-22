import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDilogComponent } from './approved-dilog.component';

describe('ApprovedDilogComponent', () => {
  let component: ApprovedDilogComponent;
  let fixture: ComponentFixture<ApprovedDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
