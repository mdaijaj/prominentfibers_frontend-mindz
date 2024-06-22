import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeDilogComponent } from './add-type-dilog.component';

describe('AddTypeDilogComponent', () => {
  let component: AddTypeDilogComponent;
  let fixture: ComponentFixture<AddTypeDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
