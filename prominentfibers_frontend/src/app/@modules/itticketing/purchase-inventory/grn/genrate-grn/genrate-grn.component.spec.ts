import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateGrnComponent } from './genrate-grn.component';

describe('GenrateGrnComponent', () => {
  let component: GenrateGrnComponent;
  let fixture: ComponentFixture<GenrateGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrateGrnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrateGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
