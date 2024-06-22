import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiseRequestListComponent } from './rise-request-list.component';

describe('RiseRequestListComponent', () => {
  let component: RiseRequestListComponent;
  let fixture: ComponentFixture<RiseRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiseRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiseRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
