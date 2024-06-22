import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusConfigureComponent } from './bonus-configure.component';

describe('BonusConfigureComponent', () => {
  let component: BonusConfigureComponent;
  let fixture: ComponentFixture<BonusConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusConfigureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
