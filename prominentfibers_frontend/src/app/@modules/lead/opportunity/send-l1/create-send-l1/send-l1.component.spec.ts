import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendL1Component } from './send-l1.component';

describe('SendL1Component', () => {
  let component: SendL1Component;
  let fixture: ComponentFixture<SendL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendL1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
