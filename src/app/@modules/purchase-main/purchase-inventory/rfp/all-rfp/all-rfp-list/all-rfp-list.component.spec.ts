import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRfpListComponent } from './all-rfp-list.component';

describe('AllRfpListComponent', () => {
  let component: AllRfpListComponent;
  let fixture: ComponentFixture<AllRfpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRfpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRfpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
