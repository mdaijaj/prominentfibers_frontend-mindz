import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableActionComponent } from './variable-action.component';

describe('VariableActionComponent', () => {
  let component: VariableActionComponent;
  let fixture: ComponentFixture<VariableActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariableActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
