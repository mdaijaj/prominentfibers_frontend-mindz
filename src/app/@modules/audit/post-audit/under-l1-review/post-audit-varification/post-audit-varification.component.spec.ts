import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAuditVarificationComponent } from './post-audit-varification.component';

describe('PostAuditVarificationComponent', () => {
  let component: PostAuditVarificationComponent;
  let fixture: ComponentFixture<PostAuditVarificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAuditVarificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAuditVarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
