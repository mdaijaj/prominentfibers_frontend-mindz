import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDilogComponent } from './add-dilog.component';

describe('AddDilogComponent', () => {
  let component: AddDilogComponent;
  let fixture: ComponentFixture<AddDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
