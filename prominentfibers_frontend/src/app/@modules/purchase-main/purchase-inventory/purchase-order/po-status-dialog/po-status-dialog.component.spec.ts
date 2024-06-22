import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoStatusDialogComponent } from './po-status-dialog.component';

describe('PoStatusDialogComponent', () => {
  let component: PoStatusDialogComponent;
  let fixture: ComponentFixture<PoStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoStatusDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
