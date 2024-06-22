import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoActionComponent } from './po-action.component';

describe('PoActionComponent', () => {
  let component: PoActionComponent;
  let fixture: ComponentFixture<PoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
