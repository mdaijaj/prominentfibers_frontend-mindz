import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormResComponent } from './request-form-res.component';

describe('RequestFormResComponent', () => {
  let component: RequestFormResComponent;
  let fixture: ComponentFixture<RequestFormResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestFormResComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFormResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
