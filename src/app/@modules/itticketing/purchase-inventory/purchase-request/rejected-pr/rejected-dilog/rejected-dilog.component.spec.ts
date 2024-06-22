import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDilogComponent } from './rejected-dilog.component';

describe('RejectedDilogComponent', () => {
  let component: RejectedDilogComponent;
  let fixture: ComponentFixture<RejectedDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
