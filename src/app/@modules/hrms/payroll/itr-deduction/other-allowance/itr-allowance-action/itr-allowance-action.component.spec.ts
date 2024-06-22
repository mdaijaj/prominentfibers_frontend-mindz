import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrAllowanceActionComponent } from './itr-allowance-action.component';

describe('ItrAllowanceActionComponent', () => {
  let component: ItrAllowanceActionComponent;
  let fixture: ComponentFixture<ItrAllowanceActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrAllowanceActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrAllowanceActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
