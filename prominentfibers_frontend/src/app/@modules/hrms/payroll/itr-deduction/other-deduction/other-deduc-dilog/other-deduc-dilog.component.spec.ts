import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDeducDilogComponent } from './other-deduc-dilog.component';

describe('OtherDeducDilogComponent', () => {
  let component: OtherDeducDilogComponent;
  let fixture: ComponentFixture<OtherDeducDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDeducDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDeducDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
