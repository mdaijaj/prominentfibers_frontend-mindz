import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeAppActionComponent } from './to-be-app-action.component';

describe('ToBeAppActionComponent', () => {
  let component: ToBeAppActionComponent;
  let fixture: ComponentFixture<ToBeAppActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToBeAppActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToBeAppActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
