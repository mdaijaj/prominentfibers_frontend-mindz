import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardDailogComponent } from './outward-dailog.component';

describe('OutwardDailogComponent', () => {
  let component: OutwardDailogComponent;
  let fixture: ComponentFixture<OutwardDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
