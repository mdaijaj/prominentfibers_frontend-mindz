import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisePoComponent } from './raise-po.component';

describe('RaisePoComponent', () => {
  let component: RaisePoComponent;
  let fixture: ComponentFixture<RaisePoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisePoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaisePoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
