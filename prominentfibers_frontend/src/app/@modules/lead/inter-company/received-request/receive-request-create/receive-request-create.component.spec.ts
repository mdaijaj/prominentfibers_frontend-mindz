import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveRequestCreateComponent } from './receive-request-create.component';

describe('ReceiveRequestCreateComponent', () => {
  let component: ReceiveRequestCreateComponent;
  let fixture: ComponentFixture<ReceiveRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveRequestCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
