import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInwardComponent } from './create-inward.component';

describe('CreateInwardComponent', () => {
  let component: CreateInwardComponent;
  let fixture: ComponentFixture<CreateInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
