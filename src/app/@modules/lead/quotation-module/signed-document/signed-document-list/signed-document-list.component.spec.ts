import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedDocumentListComponent } from './signed-document-list.component';

describe('SignedDocumentListComponent', () => {
  let component: SignedDocumentListComponent;
  let fixture: ComponentFixture<SignedDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedDocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignedDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
