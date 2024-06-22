import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookauditorComponent } from './bookauditor.component';

describe('BookauditorComponent', () => {
  let component: BookauditorComponent;
  let fixture: ComponentFixture<BookauditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookauditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookauditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
