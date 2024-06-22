import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditorCreateComponent } from './add-auditor-create.component';

describe('AddAuditorCreateComponent', () => {
  let component: AddAuditorCreateComponent;
  let fixture: ComponentFixture<AddAuditorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAuditorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAuditorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
