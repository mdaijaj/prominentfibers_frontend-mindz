import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalateListComponent } from './list-escalate.component';

describe('EscalateListComponent', () => {
  let component: EscalateListComponent;
  let fixture: ComponentFixture<EscalateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
