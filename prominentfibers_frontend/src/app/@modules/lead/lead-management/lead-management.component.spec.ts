import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadGenerationComponent } from './lead-management.component';

describe('LeadGenerationComponent', () => {
  let component: LeadGenerationComponent;
  let fixture: ComponentFixture<LeadGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
