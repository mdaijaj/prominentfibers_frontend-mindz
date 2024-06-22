import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalActionComponent } from './rental-action.component';

describe('RentalActionComponent', () => {
  let component: RentalActionComponent;
  let fixture: ComponentFixture<RentalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
