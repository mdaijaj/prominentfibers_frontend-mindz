import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVerifyCsvPopupComponent } from './upload-verify-csv-popup.component';

describe('UploadCsvPopupComponent', () => {
  let component: UploadVerifyCsvPopupComponent;
  let fixture: ComponentFixture<UploadVerifyCsvPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadVerifyCsvPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadVerifyCsvPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
