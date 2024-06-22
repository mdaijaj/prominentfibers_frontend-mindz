import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendForSMComponent } from './send-for-s&m.component';

describe('SendForSMComponent', () => {
  let component: SendForSMComponent;
  let fixture: ComponentFixture<SendForSMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendForSMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendForSMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
