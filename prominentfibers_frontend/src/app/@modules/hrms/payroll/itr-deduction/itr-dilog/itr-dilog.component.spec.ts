import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItrDilogComponent } from './itr-dilog.component';

describe('ItrDilogComponent', () => {
  let component: ItrDilogComponent;
  let fixture: ComponentFixture<ItrDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItrDilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItrDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
