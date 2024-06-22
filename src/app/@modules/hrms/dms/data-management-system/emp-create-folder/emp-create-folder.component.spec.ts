import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCreateFolderComponent } from './emp-create-folder.component';

describe('EmpCreateFolderComponent', () => {
  let component: EmpCreateFolderComponent;
  let fixture: ComponentFixture<EmpCreateFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpCreateFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCreateFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
