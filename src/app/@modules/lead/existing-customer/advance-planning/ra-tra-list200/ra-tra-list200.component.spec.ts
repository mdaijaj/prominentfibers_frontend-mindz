import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST200Component } from './ra-tra-list200.component';

describe('RATRALIST200Component', () => {
  let component: RATRALIST200Component;
  let fixture: ComponentFixture<RATRALIST200Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST200Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
