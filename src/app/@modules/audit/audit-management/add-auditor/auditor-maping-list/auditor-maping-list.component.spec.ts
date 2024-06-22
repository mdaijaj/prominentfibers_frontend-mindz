import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorMapingListComponent } from './auditor-maping-list.component';

describe('AuditorMapingListComponent', () => {
  let component: AuditorMapingListComponent;
  let fixture: ComponentFixture<AuditorMapingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorMapingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditorMapingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
