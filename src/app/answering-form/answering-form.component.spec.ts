import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweringFormComponent } from './answering-form.component';

describe('AnsweringFormComponent', () => {
  let component: AnsweringFormComponent;
  let fixture: ComponentFixture<AnsweringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweringFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsweringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
