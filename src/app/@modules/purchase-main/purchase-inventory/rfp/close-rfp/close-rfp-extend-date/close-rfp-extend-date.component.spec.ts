import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRfpExtendDateComponent } from './close-rfp-extend-date.component';

describe('CloseRfpExtendDateComponent', () => {
  let component: CloseRfpExtendDateComponent;
  let fixture: ComponentFixture<CloseRfpExtendDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRfpExtendDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseRfpExtendDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
