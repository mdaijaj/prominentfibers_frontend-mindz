import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrActionComponent } from './itr-action.component';

describe('ItrActionComponent', () => {
  let component: ItrActionComponent;
  let fixture: ComponentFixture<ItrActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
