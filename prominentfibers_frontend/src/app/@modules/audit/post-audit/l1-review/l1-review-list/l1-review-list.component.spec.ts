import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L1ReviewListComponent } from './l1-review-list.component';

describe('L1ReviewListComponent', () => {
  let component: L1ReviewListComponent;
  let fixture: ComponentFixture<L1ReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L1ReviewListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L1ReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
