import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFolderComponent } from './edit-folder.component';

describe('EditFolderComponent', () => {
  let component: EditFolderComponent;
  let fixture: ComponentFixture<EditFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
