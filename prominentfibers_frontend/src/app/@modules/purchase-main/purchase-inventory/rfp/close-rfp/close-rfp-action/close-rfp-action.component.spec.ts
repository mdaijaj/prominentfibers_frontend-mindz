import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseRfpActionComponent } from './close-rfp-action.component';

describe('CloseRfpActionComponent', () => {
  let component: CloseRfpActionComponent;
  let fixture: ComponentFixture<CloseRfpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseRfpActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseRfpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
