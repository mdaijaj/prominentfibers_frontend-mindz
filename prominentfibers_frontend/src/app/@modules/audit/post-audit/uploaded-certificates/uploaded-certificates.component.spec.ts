import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCertificatesComponent } from './uploaded-certificates.component';

describe('UploadedCertificatesComponent', () => {
  let component: UploadedCertificatesComponent;
  let fixture: ComponentFixture<UploadedCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadedCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
