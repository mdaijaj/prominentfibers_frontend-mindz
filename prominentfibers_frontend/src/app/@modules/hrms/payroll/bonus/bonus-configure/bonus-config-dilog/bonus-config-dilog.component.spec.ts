import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusConfigDilogComponent } from './bonus-config-dilog.component';

describe('BonusConfigDilogComponent', () => {
  let component: BonusConfigDilogComponent;
  let fixture: ComponentFixture<BonusConfigDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusConfigDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonusConfigDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
