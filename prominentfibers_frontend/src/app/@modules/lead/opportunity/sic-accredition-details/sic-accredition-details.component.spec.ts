import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicAccreditionDetailsComponent } from './sic-accredition-details.component';

describe('SicAccreditionDetailsComponent', () => {
  let component: SicAccreditionDetailsComponent;
  let fixture: ComponentFixture<SicAccreditionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicAccreditionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SicAccreditionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
