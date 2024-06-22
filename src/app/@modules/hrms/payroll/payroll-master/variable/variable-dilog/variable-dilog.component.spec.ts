import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDilogComponent } from './variable-dilog.component';

describe('VariableDilogComponent', () => {
  let component: VariableDilogComponent;
  let fixture: ComponentFixture<VariableDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
