import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusConfigureActionComponent } from './bonus-configure-action.component';

describe('BonusConfigureActionComponent', () => {
  let component: BonusConfigureActionComponent;
  let fixture: ComponentFixture<BonusConfigureActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusConfigureActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusConfigureActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
