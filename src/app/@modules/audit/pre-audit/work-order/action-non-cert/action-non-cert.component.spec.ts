import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionNonCertComponent } from './action-non-cert.component';

describe('ActionNonCertComponent', () => {
  let component: ActionNonCertComponent;
  let fixture: ComponentFixture<ActionNonCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionNonCertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionNonCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
