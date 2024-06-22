import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTiketActionComponent } from './new-tiket-action.component';

describe('NewTiketActionComponent', () => {
  let component: NewTiketActionComponent;
  let fixture: ComponentFixture<NewTiketActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTiketActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTiketActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
