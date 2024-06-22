import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesCreateComponent } from './create.dates.component';

describe('DatesCreateComponent', () => {
  let component: DatesCreateComponent;
  let fixture: ComponentFixture<DatesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
