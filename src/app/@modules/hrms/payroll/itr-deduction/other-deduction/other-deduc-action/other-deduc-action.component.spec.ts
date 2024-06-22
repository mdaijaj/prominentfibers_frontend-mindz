import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDeducActionComponent } from './other-deduc-action.component';

describe('OtherDeducActionComponent', () => {
  let component: OtherDeducActionComponent;
  let fixture: ComponentFixture<OtherDeducActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherDeducActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDeducActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
