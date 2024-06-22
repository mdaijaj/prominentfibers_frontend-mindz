import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPoActionComponent } from './draft-po-action.component';

describe('DraftPoActionComponent', () => {
  let component: DraftPoActionComponent;
  let fixture: ComponentFixture<DraftPoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftPoActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftPoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
