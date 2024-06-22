import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidListComponent } from './paid-list.component';

describe('PaidListComponent', () => {
  let component: PaidListComponent;
  let fixture: ComponentFixture<PaidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
