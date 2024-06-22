import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HksActionComponent } from './hks-action.component';

describe('HksActionComponent', () => {
  let component: HksActionComponent;
  let fixture: ComponentFixture<HksActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HksActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HksActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
