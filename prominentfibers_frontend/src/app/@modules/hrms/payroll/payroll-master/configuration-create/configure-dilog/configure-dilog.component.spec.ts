import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureDilogComponent } from './configure-dilog.component';

describe('ConfigureDilogComponent', () => {
  let component: ConfigureDilogComponent;
  let fixture: ComponentFixture<ConfigureDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
