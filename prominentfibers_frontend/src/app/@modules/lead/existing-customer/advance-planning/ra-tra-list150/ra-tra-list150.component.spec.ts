import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST150Component } from './ra-tra-list150.component';

describe('RATRALIST150Component', () => {
  let component: RATRALIST150Component;
  let fixture: ComponentFixture<RATRALIST150Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST150Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST150Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
