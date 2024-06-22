import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuditComponent } from './post-audit.component';

describe('PostAuditComponent', () => {
  let component: PostAuditComponent;
  let fixture: ComponentFixture<PostAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
