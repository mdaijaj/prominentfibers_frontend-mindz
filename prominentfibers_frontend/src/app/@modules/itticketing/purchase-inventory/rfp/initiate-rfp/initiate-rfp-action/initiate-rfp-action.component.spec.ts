import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRfpActionComponent } from './initiate-rfp-action.component';

describe('InitiateRfpActionComponent', () => {
  let component: InitiateRfpActionComponent;
  let fixture: ComponentFixture<InitiateRfpActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateRfpActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateRfpActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
