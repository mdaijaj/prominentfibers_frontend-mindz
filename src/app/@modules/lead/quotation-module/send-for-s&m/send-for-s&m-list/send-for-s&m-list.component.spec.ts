import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendForSMListComponent } from './send-for-s&m-list.component';

describe('SendForSMListComponent', () => {
  let component: SendForSMListComponent;
  let fixture: ComponentFixture<SendForSMListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendForSMListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendForSMListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
