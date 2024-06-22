import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestMainComponent } from './travel-request.component';

describe('TravelRequestMainComponent', () => {
  let component: TravelRequestMainComponent;
  let fixture: ComponentFixture<TravelRequestMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelRequestMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelRequestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
