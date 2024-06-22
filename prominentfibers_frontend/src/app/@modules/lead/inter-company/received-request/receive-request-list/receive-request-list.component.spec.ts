import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveRequestListComponent } from './receive-request-list.component';

describe('ReceiveRequestListComponent', () => {
  let component: ReceiveRequestListComponent;
  let fixture: ComponentFixture<ReceiveRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
