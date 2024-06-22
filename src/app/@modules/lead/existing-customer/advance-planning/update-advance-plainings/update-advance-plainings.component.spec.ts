import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdvancePlainingsComponent } from './update-advance-plainings.component';

describe('UpdateAdvancePlainingsComponent', () => {
  let component: UpdateAdvancePlainingsComponent;
  let fixture: ComponentFixture<UpdateAdvancePlainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdvancePlainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdvancePlainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
