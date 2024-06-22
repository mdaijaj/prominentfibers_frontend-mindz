import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardDailogComponent } from './inward-dailog.component';

describe('InwardDailogComponent', () => {
  let component: InwardDailogComponent;
  let fixture: ComponentFixture<InwardDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
