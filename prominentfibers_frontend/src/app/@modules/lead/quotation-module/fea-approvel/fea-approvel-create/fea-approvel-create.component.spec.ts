import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaApprovelCreateComponent } from './fea-approvel-create.component';

describe('FeaApprovelCreateComponent', () => {
  let component: FeaApprovelCreateComponent;
  let fixture: ComponentFixture<FeaApprovelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaApprovelCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaApprovelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
