import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspentionListConditionBasisComponent } from './suspention-list-condition-basis.component';

describe('SuspentionListConditionBasisComponent', () => {
  let component: SuspentionListConditionBasisComponent;
  let fixture: ComponentFixture<SuspentionListConditionBasisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspentionListConditionBasisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspentionListConditionBasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
