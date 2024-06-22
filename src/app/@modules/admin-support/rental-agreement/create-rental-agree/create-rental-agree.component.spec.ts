import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentalAgreeComponent } from './create-rental-agree.component';

describe('CreateRentalAgreeComponent', () => {
  let component: CreateRentalAgreeComponent;
  let fixture: ComponentFixture<CreateRentalAgreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRentalAgreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRentalAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
