import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisePoActionComponent } from './raise-po-action.component';

describe('RaisePoActionComponent', () => {
  let component: RaisePoActionComponent;
  let fixture: ComponentFixture<RaisePoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisePoActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaisePoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
