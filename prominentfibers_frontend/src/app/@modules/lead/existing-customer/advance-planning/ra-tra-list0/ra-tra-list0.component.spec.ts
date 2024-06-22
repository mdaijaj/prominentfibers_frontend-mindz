import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaTraList0Component } from './ra-tra-list0.component';

describe('RaTraList0Component', () => {
  let component: RaTraList0Component;
  let fixture: ComponentFixture<RaTraList0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaTraList0Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaTraList0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
