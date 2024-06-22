import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RATRALIST180Component } from './ra-tra-list180.component';

describe('RATRALIST180Component', () => {
  let component: RATRALIST180Component;
  let fixture: ComponentFixture<RATRALIST180Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RATRALIST180Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RATRALIST180Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
