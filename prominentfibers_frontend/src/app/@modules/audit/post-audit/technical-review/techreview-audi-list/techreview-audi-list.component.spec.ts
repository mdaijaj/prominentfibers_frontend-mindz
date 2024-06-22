import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechreviewAudiListComponent } from './techreview-audi-list.component';

describe('TechreviewAudiListComponent', () => {
  let component: TechreviewAudiListComponent;
  let fixture: ComponentFixture<TechreviewAudiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechreviewAudiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechreviewAudiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
