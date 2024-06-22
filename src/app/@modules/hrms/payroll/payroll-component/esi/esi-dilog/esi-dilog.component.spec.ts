import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsiDilogComponent } from './esi-dilog.component';

describe('EsiDilogComponent', () => {
  let component: EsiDilogComponent;
  let fixture: ComponentFixture<EsiDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsiDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsiDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
