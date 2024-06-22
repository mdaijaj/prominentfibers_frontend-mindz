import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedAuditorCreateComponent } from './blocked-auditor-create.component';

describe('BlockedAuditorCreateComponent', () => {
  let component: BlockedAuditorCreateComponent;
  let fixture: ComponentFixture<BlockedAuditorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedAuditorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockedAuditorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
