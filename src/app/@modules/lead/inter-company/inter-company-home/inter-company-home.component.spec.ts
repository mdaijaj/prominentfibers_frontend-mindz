import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterCompanyHomeComponent } from './inter-company-home.component';

describe('InterCompanyHomeComponent', () => {
  let component: InterCompanyHomeComponent;
  let fixture: ComponentFixture<InterCompanyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterCompanyHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterCompanyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
