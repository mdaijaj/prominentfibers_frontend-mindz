import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedAuditorListComponent } from './blocked-auditor.component';

describe('BlockedAuditorListComponent', () => {
  let component: BlockedAuditorListComponent;
  let fixture: ComponentFixture<BlockedAuditorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedAuditorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedAuditorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
