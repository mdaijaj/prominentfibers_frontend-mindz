import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaPendingListComponent } from './fea-pending-list.component';

describe('FeaPendingListComponent', () => {
  let component: FeaPendingListComponent;
  let fixture: ComponentFixture<FeaPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaPendingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
