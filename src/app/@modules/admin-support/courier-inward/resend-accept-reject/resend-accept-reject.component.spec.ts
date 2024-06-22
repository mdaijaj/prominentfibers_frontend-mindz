import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendAcceptRejectComponent } from './resend-accept-reject.component';

describe('ResendAcceptRejectComponent', () => {
  let component: ResendAcceptRejectComponent;
  let fixture: ComponentFixture<ResendAcceptRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendAcceptRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendAcceptRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
