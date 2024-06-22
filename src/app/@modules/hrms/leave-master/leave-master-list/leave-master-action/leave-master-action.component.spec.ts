import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMasterActionComponent } from './leave-master-action.component';

describe('LeaveMasterActionComponent', () => {
  let component: LeaveMasterActionComponent;
  let fixture: ComponentFixture<LeaveMasterActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveMasterActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveMasterActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
