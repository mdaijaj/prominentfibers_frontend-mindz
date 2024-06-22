import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQualityCheckComponent } from './update-quality-check.component';

describe('UpdateQualityCheckComponent', () => {
  let component: UpdateQualityCheckComponent;
  let fixture: ComponentFixture<UpdateQualityCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateQualityCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQualityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
