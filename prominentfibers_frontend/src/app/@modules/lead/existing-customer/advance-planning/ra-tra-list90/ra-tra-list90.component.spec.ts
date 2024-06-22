import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST90Component } from './ra-tra-list90.component';

describe('RATRALIST90Component', () => {
  let component: RATRALIST90Component;
  let fixture: ComponentFixture<RATRALIST90Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST90Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST90Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
