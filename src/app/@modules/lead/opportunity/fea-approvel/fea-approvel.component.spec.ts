import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaApprovelComponent } from './fea-approvel.component';

describe('FeaApprovelComponent', () => {
  let component: FeaApprovelComponent;
  let fixture: ComponentFixture<FeaApprovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaApprovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
