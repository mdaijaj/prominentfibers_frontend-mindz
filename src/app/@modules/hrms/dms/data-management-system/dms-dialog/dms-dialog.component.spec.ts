import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMSDialogComponent } from './dms-dialog.component';

describe('DMSDialogComponent', () => {
  let component: DMSDialogComponent;
  let fixture: ComponentFixture<DMSDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMSDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMSDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
