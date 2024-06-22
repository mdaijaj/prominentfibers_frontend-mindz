import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitallySignedDocumentListComponent } from './digitally-signed-document-list.component';

describe('DigitallySignedDocumentListComponent', () => {
  let component: DigitallySignedDocumentListComponent;
  let fixture: ComponentFixture<DigitallySignedDocumentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitallySignedDocumentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DigitallySignedDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
