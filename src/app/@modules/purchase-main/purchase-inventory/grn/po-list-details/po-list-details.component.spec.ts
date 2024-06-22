import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoListDetailsComponent } from './po-list-details.component';

describe('PoListDetailsComponent', () => {
  let component: PoListDetailsComponent;
  let fixture: ComponentFixture<PoListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoListDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
