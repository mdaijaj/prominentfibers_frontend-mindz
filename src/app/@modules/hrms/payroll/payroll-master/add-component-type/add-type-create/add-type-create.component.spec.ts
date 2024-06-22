import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCreateComponent } from './add-type-create.component';

describe('AddTypeCreateComponent', () => {
  let component: AddTypeCreateComponent;
  let fixture: ComponentFixture<AddTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
