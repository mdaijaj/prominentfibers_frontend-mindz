import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryUploadDilogComponent } from './salary-upload-dilog.component';

describe('SalaryUploadDilogComponent', () => {
  let component: SalaryUploadDilogComponent;
  let fixture: ComponentFixture<SalaryUploadDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryUploadDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryUploadDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
