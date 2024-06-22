import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementSystemComponent } from './data-management-system.component';

describe('DataManagementSystemComponent', () => {
  let component: DataManagementSystemComponent;
  let fixture: ComponentFixture<DataManagementSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataManagementSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
