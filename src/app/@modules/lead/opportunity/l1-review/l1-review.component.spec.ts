import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1ReviewComponent } from './l1-review.component';

describe('L1ReviewComponent', () => {
  let component: L1ReviewComponent;
  let fixture: ComponentFixture<L1ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1ReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L1ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
