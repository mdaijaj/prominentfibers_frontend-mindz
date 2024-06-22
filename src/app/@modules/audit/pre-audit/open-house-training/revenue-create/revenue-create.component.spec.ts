import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueCreateComponent } from './revenue-create.component';

describe('RevenueCreateComponent', () => {
  let component: RevenueCreateComponent;
  let fixture: ComponentFixture<RevenueCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
