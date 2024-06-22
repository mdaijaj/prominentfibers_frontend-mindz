import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutwardComponent } from './create-outward.component';

describe('CreateOutwardComponent', () => {
  let component: CreateOutwardComponent;
  let fixture: ComponentFixture<CreateOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOutwardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
