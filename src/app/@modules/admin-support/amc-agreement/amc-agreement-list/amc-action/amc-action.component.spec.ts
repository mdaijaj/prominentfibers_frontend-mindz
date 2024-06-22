import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcActionComponent } from './amc-action.component';

describe('AmcActionComponent', () => {
  let component: AmcActionComponent;
  let fixture: ComponentFixture<AmcActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmcActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmcActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
