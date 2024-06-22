import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeAccessListComponent } from './mange-access-list.component';

describe('MangeAccessListComponent', () => {
  let component: MangeAccessListComponent;
  let fixture: ComponentFixture<MangeAccessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangeAccessListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeAccessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
