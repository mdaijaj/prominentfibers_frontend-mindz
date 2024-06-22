import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationActionComponent } from './configration-action.component';

describe('ConfigrationActionComponent', () => {
  let component: ConfigrationActionComponent;
  let fixture: ComponentFixture<ConfigrationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigrationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigrationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
