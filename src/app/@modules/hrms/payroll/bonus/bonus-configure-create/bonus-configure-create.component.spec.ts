import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusConfigureCreateComponent } from './bonus-configure-create.component';

describe('BonusConfigureCreateComponent', () => {
  let component: BonusConfigureCreateComponent;
  let fixture: ComponentFixture<BonusConfigureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusConfigureCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusConfigureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
