import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrStatusDilogComponent } from './pr-status-dilog.component';

describe('PrStatusDilogComponent', () => {
  let component: PrStatusDilogComponent;
  let fixture: ComponentFixture<PrStatusDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrStatusDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrStatusDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
