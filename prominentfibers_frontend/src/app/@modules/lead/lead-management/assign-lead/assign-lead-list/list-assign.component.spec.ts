import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignListComponent } from './list-assign.component';

describe('AssignListComponent', () => {
  let component: AssignListComponent;
  let fixture: ComponentFixture<AssignListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
