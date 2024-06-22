import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBomDialogComponent } from './add-bom-dialog.component';

describe('AddBomDialogComponent', () => {
  let component: AddBomDialogComponent;
  let fixture: ComponentFixture<AddBomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
