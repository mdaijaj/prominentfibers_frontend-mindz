import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditorListComponent } from './add-auditor-list.component';

describe('AddAuditorListComponent', () => {
  let component: AddAuditorListComponent;
  let fixture: ComponentFixture<AddAuditorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuditorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuditorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
