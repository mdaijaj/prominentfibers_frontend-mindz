import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfEsiComponent } from './pf-esi.component';

describe('PfEsiComponent', () => {
  let component: PfEsiComponent;
  let fixture: ComponentFixture<PfEsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfEsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfEsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
