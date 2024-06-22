import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfActionComponent } from './pf-action.component';

describe('PfActionComponent', () => {
  let component: PfActionComponent;
  let fixture: ComponentFixture<PfActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
