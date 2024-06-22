import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTravelUpdateComponent } from './draft-travel-update.component';

describe('DraftTravelUpdateComponent', () => {
  let component: DraftTravelUpdateComponent;
  let fixture: ComponentFixture<DraftTravelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftTravelUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftTravelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
