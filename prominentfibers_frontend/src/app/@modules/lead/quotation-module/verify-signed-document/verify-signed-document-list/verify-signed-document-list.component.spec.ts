import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedSignedDocumentListComponent } from './verify-signed-document-list.component';

describe('VerifiedSignedDocumentListComponent', () => {
  let component: VerifiedSignedDocumentListComponent;
  let fixture: ComponentFixture<VerifiedSignedDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedSignedDocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedSignedDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
