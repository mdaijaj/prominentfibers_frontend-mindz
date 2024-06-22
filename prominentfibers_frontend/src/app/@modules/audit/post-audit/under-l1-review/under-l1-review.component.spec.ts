import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderL1ReviewComponent } from './under-l1-review.component';

describe('UnderL1ReviewComponent', () => {
  let component: UnderL1ReviewComponent;
  let fixture: ComponentFixture<UnderL1ReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderL1ReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderL1ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
