import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardActionComponent } from './outward-action.component';

describe('OutwardActionComponent', () => {
  let component: OutwardActionComponent;
  let fixture: ComponentFixture<OutwardActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutwardActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
