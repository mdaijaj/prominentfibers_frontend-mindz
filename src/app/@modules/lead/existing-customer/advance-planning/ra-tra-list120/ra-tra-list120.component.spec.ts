import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST120Component } from './ra-tra-list120.component';

describe('RATRALIST120Component', () => {
  let component: RATRALIST120Component;
  let fixture: ComponentFixture<RATRALIST120Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST120Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST120Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
