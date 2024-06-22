import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCreateComponent } from './configuration-create.component';

describe('ConfigurationCreateComponent', () => {
  let component: ConfigurationCreateComponent;
  let fixture: ComponentFixture<ConfigurationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
