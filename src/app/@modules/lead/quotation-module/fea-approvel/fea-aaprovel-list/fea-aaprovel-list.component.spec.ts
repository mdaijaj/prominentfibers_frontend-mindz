import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaAaprovelListComponent } from './fea-aaprovel-list.component';

describe('FeaAaprovelListComponent', () => {
  let component: FeaAaprovelListComponent;
  let fixture: ComponentFixture<FeaAaprovelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaAaprovelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaAaprovelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
