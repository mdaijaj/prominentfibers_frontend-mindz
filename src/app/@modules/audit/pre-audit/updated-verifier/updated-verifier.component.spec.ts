import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedVerifierComponent } from './updated-verifier.component';

describe('UpdatedVerifierComponent', () => {
  let component: UpdatedVerifierComponent;
  let fixture: ComponentFixture<UpdatedVerifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedVerifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
