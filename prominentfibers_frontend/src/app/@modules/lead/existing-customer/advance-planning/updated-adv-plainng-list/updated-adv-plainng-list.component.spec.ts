import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedAdvPlainngListComponent } from './updated-adv-plainng-list.component';

describe('UpdatedAdvPlainngListComponent', () => {
  let component: UpdatedAdvPlainngListComponent;
  let fixture: ComponentFixture<UpdatedAdvPlainngListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedAdvPlainngListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedAdvPlainngListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
