import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPoComponent } from './rejected-po.component';

describe('RejectedPoComponent', () => {
  let component: RejectedPoComponent;
  let fixture: ComponentFixture<RejectedPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
