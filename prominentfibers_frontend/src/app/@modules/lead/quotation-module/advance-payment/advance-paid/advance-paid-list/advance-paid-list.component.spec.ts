import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaidListComponent } from './advance-paid-list.component';

describe('AdvancePaidListComponent', () => {
  let component: AdvancePaidListComponent;
  let fixture: ComponentFixture<AdvancePaidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancePaidListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancePaidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
