import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnMHeadNewComponent } from './snm-head-approver.component';

describe('SnMHeadNewComponent', () => {
  let component: SnMHeadNewComponent;
  let fixture: ComponentFixture<SnMHeadNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnMHeadNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnMHeadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
