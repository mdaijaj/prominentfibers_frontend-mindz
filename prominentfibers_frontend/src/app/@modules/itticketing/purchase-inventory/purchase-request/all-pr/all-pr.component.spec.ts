import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPrComponent } from './all-pr.component';

describe('AllPrComponent', () => {
  let component: AllPrComponent;
  let fixture: ComponentFixture<AllPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
