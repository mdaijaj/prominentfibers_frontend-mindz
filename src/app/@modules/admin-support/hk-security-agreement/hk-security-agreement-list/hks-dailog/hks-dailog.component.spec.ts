import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HksDailogComponent } from './hks-dailog.component';

describe('HksDailogComponent', () => {
  let component: HksDailogComponent;
  let fixture: ComponentFixture<HksDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HksDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HksDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
