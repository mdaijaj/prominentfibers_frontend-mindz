import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDilogComponent } from './add-product-dilog.component';

describe('AddProductDilogComponent', () => {
  let component: AddProductDilogComponent;
  let fixture: ComponentFixture<AddProductDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
