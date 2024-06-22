import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1ReviewerComponent } from './l1-reviewer.component';

describe('L1ReviewerComponent', () => {
  let component: L1ReviewerComponent;
  let fixture: ComponentFixture<L1ReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1ReviewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L1ReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
