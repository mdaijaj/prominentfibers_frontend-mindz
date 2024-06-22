import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletenessCheckActionComponent } from './completeness-check-action.component';

describe('CompletenessCheckActionComponent', () => {
  let component: CompletenessCheckActionComponent;
  let fixture: ComponentFixture<CompletenessCheckActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletenessCheckActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletenessCheckActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
