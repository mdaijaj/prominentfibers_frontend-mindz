import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentTypeComponent } from './add-component-type.component';

describe('AddComponentTypeComponent', () => {
  let component: AddComponentTypeComponent;
  let fixture: ComponentFixture<AddComponentTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComponentTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComponentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
