import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCreateComponent } from './create.upload.component';

describe('UploadCreateComponent', () => {
  let component: UploadCreateComponent;
  let fixture: ComponentFixture<UploadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
