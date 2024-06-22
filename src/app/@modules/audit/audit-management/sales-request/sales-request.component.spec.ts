import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRequestComponent } from './sales-request.component';

describe('SalesRequestComponent', () => {
  let component: SalesRequestComponent;
  let fixture: ComponentFixture<SalesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
