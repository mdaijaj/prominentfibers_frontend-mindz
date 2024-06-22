import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardActionComponent } from './inward-action.component';

describe('InwardActionComponent', () => {
  let component: InwardActionComponent;
  let fixture: ComponentFixture<InwardActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InwardActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
