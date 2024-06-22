import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoApprovedDialogComponent } from './po-approved-dialog.component';

describe('PoApprovedDialogComponent', () => {
  let component: PoApprovedDialogComponent;
  let fixture: ComponentFixture<PoApprovedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoApprovedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoApprovedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
