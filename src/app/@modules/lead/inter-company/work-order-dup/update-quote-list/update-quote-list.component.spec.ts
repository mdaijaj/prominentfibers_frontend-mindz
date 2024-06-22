import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuoteListComponent } from './update-quote-list.component';

describe('UpdateQuoteListComponent', () => {
  let component: UpdateQuoteListComponent;
  let fixture: ComponentFixture<UpdateQuoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQuoteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
