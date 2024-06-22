import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItticketingDialogComponent } from './itticketing-dialog.component';

describe('ItticketingDialogComponent', () => {
  let component: ItticketingDialogComponent;
  let fixture: ComponentFixture<ItticketingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItticketingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItticketingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
