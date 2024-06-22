import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletenessCheckListComponent } from './completeness-check-list.component';

describe('CompletenessCheckListComponent', () => {
  let component: CompletenessCheckListComponent;
  let fixture: ComponentFixture<CompletenessCheckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletenessCheckListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletenessCheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
