import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementDialogComponent } from './achievement-dialog.component';

describe('AchievementDialogComponent', () => {
  let component: AchievementDialogComponent;
  let fixture: ComponentFixture<AchievementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AchievementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
