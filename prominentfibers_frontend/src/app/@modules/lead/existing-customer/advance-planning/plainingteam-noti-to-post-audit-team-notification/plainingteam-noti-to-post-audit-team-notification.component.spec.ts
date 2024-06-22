import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainingteamNotiToPostAuditTeamNotificationComponent } from './plainingteam-noti-to-post-audit-team-notification.component';

describe('PlainingteamNotiToPostAuditTeamNotificationComponent', () => {
  let component: PlainingteamNotiToPostAuditTeamNotificationComponent;
  let fixture: ComponentFixture<PlainingteamNotiToPostAuditTeamNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainingteamNotiToPostAuditTeamNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlainingteamNotiToPostAuditTeamNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
