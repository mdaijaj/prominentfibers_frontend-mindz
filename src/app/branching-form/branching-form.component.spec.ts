import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchingFormComponent } from './branching-form.component';

describe('BranchingFormComponent', () => {
  let component: BranchingFormComponent;
  let fixture: ComponentFixture<BranchingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
