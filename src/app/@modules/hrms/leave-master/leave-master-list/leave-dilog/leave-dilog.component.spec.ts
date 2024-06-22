import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDilogComponent } from './leave-dilog.component';

describe('LeaveDilogComponent', () => {
  let component: LeaveDilogComponent;
  let fixture: ComponentFixture<LeaveDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
