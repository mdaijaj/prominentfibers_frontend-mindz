import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrHeaderComponent } from './itr-header.component';

describe('ItrHeaderComponent', () => {
  let component: ItrHeaderComponent;
  let fixture: ComponentFixture<ItrHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
