import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubWorkOrderListComponent } from './club-work-order-list.component';

describe('ClubWorkOrderListComponent', () => {
  let component: ClubWorkOrderListComponent;
  let fixture: ComponentFixture<ClubWorkOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubWorkOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubWorkOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
