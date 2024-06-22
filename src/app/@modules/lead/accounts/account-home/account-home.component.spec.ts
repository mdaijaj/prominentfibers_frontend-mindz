import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHome } from './account-home.component';

describe('AccountHome', () => {
  let component: AccountHome;
  let fixture: ComponentFixture<AccountHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHome ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
