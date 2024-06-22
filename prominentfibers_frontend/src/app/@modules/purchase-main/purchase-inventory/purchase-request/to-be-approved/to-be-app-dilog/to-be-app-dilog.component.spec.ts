import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeAppDilogComponent } from './to-be-app-dilog.component';

describe('ToBeAppDilogComponent', () => {
  let component: ToBeAppDilogComponent;
  let fixture: ComponentFixture<ToBeAppDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToBeAppDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToBeAppDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
