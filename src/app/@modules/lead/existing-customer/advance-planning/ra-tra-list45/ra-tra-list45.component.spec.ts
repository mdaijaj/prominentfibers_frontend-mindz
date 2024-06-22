import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST45Component } from './ra-tra-list45.component';

describe('RATRALIST45Component', () => {
  let component: RATRALIST45Component;
  let fixture: ComponentFixture<RATRALIST45Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST45Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST45Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
