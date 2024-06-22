import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrAllowanceDilogComponent } from './itr-allowance-dilog.component';

describe('ItrAllowanceDilogComponent', () => {
  let component: ItrAllowanceDilogComponent;
  let fixture: ComponentFixture<ItrAllowanceDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrAllowanceDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrAllowanceDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
