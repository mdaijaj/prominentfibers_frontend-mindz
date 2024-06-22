import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaApprovelApproveComponent } from './fea-approvel-approve.component';

describe('FeaApprovelApproveComponent', () => {
  let component: FeaApprovelApproveComponent;
  let fixture: ComponentFixture<FeaApprovelApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaApprovelApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaApprovelApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
