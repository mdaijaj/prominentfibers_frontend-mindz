import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicableComponent } from './applicable.component';

describe('ApplicableComponent', () => {
  let component: ApplicableComponent;
  let fixture: ComponentFixture<ApplicableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
