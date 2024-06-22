import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTravelListComponent } from './draft-travel-list.component';

describe('DraftTravelListComponent', () => {
  let component: DraftTravelListComponent;
  let fixture: ComponentFixture<DraftTravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftTravelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
