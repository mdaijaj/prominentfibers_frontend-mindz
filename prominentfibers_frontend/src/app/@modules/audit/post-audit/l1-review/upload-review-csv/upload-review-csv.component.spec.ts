import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReviewCsvComponent } from './upload-review-csv.component';

describe('UploadReviewCsvComponent', () => {
  let component: UploadReviewCsvComponent;
  let fixture: ComponentFixture<UploadReviewCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadReviewCsvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadReviewCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
