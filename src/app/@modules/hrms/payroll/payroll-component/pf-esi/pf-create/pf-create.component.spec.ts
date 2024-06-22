import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfCreateComponent } from './pf-create.component';

describe('PfCreateComponent', () => {
  let component: PfCreateComponent;
  let fixture: ComponentFixture<PfCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
