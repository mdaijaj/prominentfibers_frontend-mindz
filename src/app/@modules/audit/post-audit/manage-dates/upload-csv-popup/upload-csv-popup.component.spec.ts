import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmangeCsvPopupComponent } from './upload-csv-popup.component';

describe('UploadCsvPopupComponent', () => {
  let component: UploadmangeCsvPopupComponent;
  let fixture: ComponentFixture<UploadmangeCsvPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadmangeCsvPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadmangeCsvPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
