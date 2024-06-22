import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRfpLinkComponent } from './send-rfp-link.component';

describe('SendRfpLinkComponent', () => {
  let component: SendRfpLinkComponent;
  let fixture: ComponentFixture<SendRfpLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRfpLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendRfpLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
