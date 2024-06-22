import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierUserListComponent } from './courier-user-list.component';

describe('CourierUserListComponent', () => {
  let component: CourierUserListComponent;
  let fixture: ComponentFixture<CourierUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
