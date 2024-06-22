import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectionComponent } from './suspection.component';

describe('SuspectionComponent', () => {
  let component: SuspectionComponent;
  let fixture: ComponentFixture<SuspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
