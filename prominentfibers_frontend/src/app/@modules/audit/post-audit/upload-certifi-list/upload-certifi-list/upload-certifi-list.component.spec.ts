import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertifiListComponent } from './upload-certifi-list.component';

describe('UploadCertifiListComponent', () => {
  let component: UploadCertifiListComponent;
  let fixture: ComponentFixture<UploadCertifiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCertifiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCertifiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
