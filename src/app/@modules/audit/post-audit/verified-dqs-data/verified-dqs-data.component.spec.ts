import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedDQSDataComponent } from './verified-dqs-data.component';

describe('VerifiedDQSDataComponent', () => {
  let component: VerifiedDQSDataComponent;
  let fixture: ComponentFixture<VerifiedDQSDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedDQSDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedDQSDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
