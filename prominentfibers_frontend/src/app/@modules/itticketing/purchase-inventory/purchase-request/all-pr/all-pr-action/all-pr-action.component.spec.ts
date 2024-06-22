import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPrActionComponent } from './all-pr-action.component';

describe('AllPrActionComponent', () => {
  let component: AllPrActionComponent;
  let fixture: ComponentFixture<AllPrActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPrActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPrActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
