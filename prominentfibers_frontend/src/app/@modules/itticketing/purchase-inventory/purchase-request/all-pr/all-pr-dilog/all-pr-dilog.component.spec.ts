import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPrDilogComponent } from './all-pr-dilog.component';

describe('AllPrDilogComponent', () => {
  let component: AllPrDilogComponent;
  let fixture: ComponentFixture<AllPrDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPrDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPrDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
