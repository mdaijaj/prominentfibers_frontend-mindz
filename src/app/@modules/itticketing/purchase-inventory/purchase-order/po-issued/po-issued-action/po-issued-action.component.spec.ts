import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoIssuedActionComponent } from './po-issued-action.component';

describe('PoIssuedActionComponent', () => {
  let component: PoIssuedActionComponent;
  let fixture: ComponentFixture<PoIssuedActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoIssuedActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoIssuedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
