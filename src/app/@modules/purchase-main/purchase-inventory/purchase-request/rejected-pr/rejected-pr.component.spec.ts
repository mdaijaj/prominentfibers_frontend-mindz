import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPrComponent } from './rejected-pr.component';

describe('RejectedPrComponent', () => {
  let component: RejectedPrComponent;
  let fixture: ComponentFixture<RejectedPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
