import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedActionComponent } from './rejected-action.component';

describe('RejectedActionComponent', () => {
  let component: RejectedActionComponent;
  let fixture: ComponentFixture<RejectedActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
