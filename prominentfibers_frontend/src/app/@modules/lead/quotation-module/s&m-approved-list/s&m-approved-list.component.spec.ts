import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMApprovedListComponent } from './s&m-approved-list.component';

describe('SMApprovedListComponent', () => {
  let component: SMApprovedListComponent;
  let fixture: ComponentFixture<SMApprovedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SMApprovedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SMApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
