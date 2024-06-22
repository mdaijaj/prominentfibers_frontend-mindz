import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsConfirmComponent } from './actionsConfirm.component';

describe('ActionsComponent', () => {
  let component: ActionsConfirmComponent;
  let fixture: ComponentFixture<ActionsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
