import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRfpComponent } from './close-rfp.component';

describe('CloseRfpComponent', () => {
  let component: CloseRfpComponent;
  let fixture: ComponentFixture<CloseRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRfpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
