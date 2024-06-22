import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerListComponent } from './manger-list.component';

describe('MangerListComponent', () => {
  let component: MangerListComponent;
  let fixture: ComponentFixture<MangerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
