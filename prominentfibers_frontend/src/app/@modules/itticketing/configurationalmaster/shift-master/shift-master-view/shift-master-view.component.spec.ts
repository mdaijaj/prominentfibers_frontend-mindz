import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftMasterViewComponent } from './shift-master-view.component';

describe('ShiftMasterViewComponent', () => {
  let component: ShiftMasterViewComponent;
  let fixture: ComponentFixture<ShiftMasterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftMasterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
