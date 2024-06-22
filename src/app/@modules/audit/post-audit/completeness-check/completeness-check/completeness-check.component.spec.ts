import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletenessCheckComponent } from './completeness-check.component';

describe('CompletenessCheckComponent', () => {
  let component: CompletenessCheckComponent;
  let fixture: ComponentFixture<CompletenessCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletenessCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletenessCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
