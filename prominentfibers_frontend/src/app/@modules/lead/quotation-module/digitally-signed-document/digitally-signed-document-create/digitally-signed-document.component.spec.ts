import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitallySignedDocumentNewComponent } from './digitally-signed-document.component';

describe('DigitallySignedDocumentNewComponent', () => {
  let component: DigitallySignedDocumentNewComponent;
  let fixture: ComponentFixture<DigitallySignedDocumentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitallySignedDocumentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitallySignedDocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
