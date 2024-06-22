import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadChildComponent } from './create-lead-child.component';

describe('CreateLeadChildComponent', () => {
  let component: CreateLeadChildComponent;
  let fixture: ComponentFixture<CreateLeadChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLeadChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLeadChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
