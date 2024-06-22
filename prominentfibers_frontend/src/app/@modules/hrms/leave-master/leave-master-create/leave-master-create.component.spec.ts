import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMasterCreateComponent } from './leave-master-create.component';

describe('LeaveMasterCreateComponent', () => {
  let component: LeaveMasterCreateComponent;
  let fixture: ComponentFixture<LeaveMasterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveMasterCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveMasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
