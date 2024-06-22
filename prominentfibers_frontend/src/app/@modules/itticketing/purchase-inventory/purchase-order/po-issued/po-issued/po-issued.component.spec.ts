import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoIssuedComponent } from './po-issued.component';

describe('PoIssuedComponent', () => {
  let component: PoIssuedComponent;
  let fixture: ComponentFixture<PoIssuedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoIssuedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
