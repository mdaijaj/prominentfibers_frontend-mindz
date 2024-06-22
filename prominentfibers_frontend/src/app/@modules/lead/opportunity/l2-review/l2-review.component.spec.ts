import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L2ReviewComponent } from './l2-review.component';

describe('L2ReviewComponent', () => {
  let component: L2ReviewComponent;
  let fixture: ComponentFixture<L2ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L2ReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L2ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
