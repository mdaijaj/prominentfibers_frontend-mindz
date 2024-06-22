import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendL1Component } from './list-send-l1.component';

describe('ListSendL1Component', () => {
  let component: ListSendL1Component;
  let fixture: ComponentFixture<ListSendL1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSendL1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSendL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
