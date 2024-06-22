import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceDailogComponent } from './insurance-dailog.component';

describe('InsuranceDailogComponent', () => {
  let component: InsuranceDailogComponent;
  let fixture: ComponentFixture<InsuranceDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
