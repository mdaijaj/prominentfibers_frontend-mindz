import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMasterListComponent } from './leave-master-list.component';

describe('LeaveMasterListComponent', () => {
  let component: LeaveMasterListComponent;
  let fixture: ComponentFixture<LeaveMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
