import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeActionComponent } from './add-type-action.component';

describe('AddTypeActionComponent', () => {
  let component: AddTypeActionComponent;
  let fixture: ComponentFixture<AddTypeActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
