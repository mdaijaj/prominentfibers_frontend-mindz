import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiseRequestCreateComponent } from './rise-request-create.component';

describe('RiseRequestCreateComponent', () => {
  let component: RiseRequestCreateComponent;
  let fixture: ComponentFixture<RiseRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiseRequestCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiseRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
