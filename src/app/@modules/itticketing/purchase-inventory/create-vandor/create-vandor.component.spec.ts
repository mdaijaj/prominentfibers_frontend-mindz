import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVandorComponent } from './create-vandor.component';

describe('CreateVandorComponent', () => {
  let component: CreateVandorComponent;
  let fixture: ComponentFixture<CreateVandorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVandorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVandorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
