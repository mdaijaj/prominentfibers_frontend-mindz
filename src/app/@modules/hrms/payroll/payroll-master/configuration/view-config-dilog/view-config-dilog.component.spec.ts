import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigDilogComponent } from './view-config-dilog.component';

describe('ViewConfigDilogComponent', () => {
  let component: ViewConfigDilogComponent;
  let fixture: ComponentFixture<ViewConfigDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConfigDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConfigDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
