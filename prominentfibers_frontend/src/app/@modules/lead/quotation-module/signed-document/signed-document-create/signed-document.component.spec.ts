import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedDocumentNewComponent } from './signed-document.component';

describe('SignedDocumentNewComponent', () => {
  let component: SignedDocumentNewComponent;
  let fixture: ComponentFixture<SignedDocumentNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedDocumentNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedDocumentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
