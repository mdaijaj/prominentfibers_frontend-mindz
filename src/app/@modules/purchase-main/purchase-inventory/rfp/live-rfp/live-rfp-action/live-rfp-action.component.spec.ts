import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRfpActionComponent } from './live-rfp-action.component';

describe('LiveRfpActionComponent', () => {
  let component: LiveRfpActionComponent;
  let fixture: ComponentFixture<LiveRfpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRfpActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveRfpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
