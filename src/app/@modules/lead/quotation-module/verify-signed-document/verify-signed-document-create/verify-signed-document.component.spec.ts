import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedSignedDocumentNewComponent } from './verify-signed-document.component';

describe('VerifiedSignedDocumentNewComponent', () => {
  let component: VerifiedSignedDocumentNewComponent;
  let fixture: ComponentFixture<VerifiedSignedDocumentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedSignedDocumentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedSignedDocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
