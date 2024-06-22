import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAndMComponent } from './s-and-m.component';

describe('SAndMComponent', () => {
  let component: SAndMComponent;
  let fixture: ComponentFixture<SAndMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SAndMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SAndMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
