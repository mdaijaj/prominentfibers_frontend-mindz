import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnMHeadListComponent } from './snm-head-approver-list.component';

describe('SnMHeadListComponent', () => {
  let component: SnMHeadListComponent;
  let fixture: ComponentFixture<SnMHeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnMHeadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnMHeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
