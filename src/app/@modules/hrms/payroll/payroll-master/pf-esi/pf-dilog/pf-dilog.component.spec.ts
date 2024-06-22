import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfDilogComponent } from './pf-dilog.component';

describe('PfDilogComponent', () => {
  let component: PfDilogComponent;
  let fixture: ComponentFixture<PfDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
