import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuchaseOrderActionComponent } from './puchase-order-action.component';

describe('PuchaseOrderActionComponent', () => {
  let component: PuchaseOrderActionComponent;
  let fixture: ComponentFixture<PuchaseOrderActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuchaseOrderActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuchaseOrderActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
