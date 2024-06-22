import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedResponseComponent } from './received-response.component';

describe('ReceivedResponseComponent', () => {
  let component: ReceivedResponseComponent;
  let fixture: ComponentFixture<ReceivedResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
