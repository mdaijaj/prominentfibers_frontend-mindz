import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateListComponent } from './list-validate.component';

describe('ValidateListComponent', () => {
  let component: ValidateListComponent;
  let fixture: ComponentFixture<ValidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
