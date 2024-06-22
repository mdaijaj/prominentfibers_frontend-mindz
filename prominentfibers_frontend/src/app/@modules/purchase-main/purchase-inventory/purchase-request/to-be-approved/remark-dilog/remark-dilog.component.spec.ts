import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkDilogComponent } from './remark-dilog.component';

describe('RemarkDilogComponent', () => {
  let component: RemarkDilogComponent;
  let fixture: ComponentFixture<RemarkDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
