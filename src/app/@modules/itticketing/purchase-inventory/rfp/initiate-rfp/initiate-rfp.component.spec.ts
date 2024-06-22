import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRfpComponent } from './initiate-rfp.component';

describe('InitiateRfpComponent', () => {
  let component: InitiateRfpComponent;
  let fixture: ComponentFixture<InitiateRfpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateRfpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
