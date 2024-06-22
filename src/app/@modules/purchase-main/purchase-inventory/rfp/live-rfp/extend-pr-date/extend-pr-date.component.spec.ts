import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendPrDateComponent } from './extend-pr-date.component';

describe('ExtendPrDateComponent', () => {
  let component: ExtendPrDateComponent;
  let fixture: ComponentFixture<ExtendPrDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendPrDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendPrDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
