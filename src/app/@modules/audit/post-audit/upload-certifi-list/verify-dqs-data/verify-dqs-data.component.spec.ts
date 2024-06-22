import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDqsDataComponent } from './verify-dqs-data.component';

describe('VerifyDqsDataComponent', () => {
  let component: VerifyDqsDataComponent;
  let fixture: ComponentFixture<VerifyDqsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyDqsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyDqsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
