import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TOPDFComponent } from './to-pdf.component';

describe('TOPDFComponent', () => {
  let component: TOPDFComponent;
  let fixture: ComponentFixture<TOPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TOPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TOPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
