import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectCreateComponent } from './create.prospect.component';

describe('ProspectCreateComponent', () => {
  let component: ProspectCreateComponent;
  let fixture: ComponentFixture<ProspectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProspectCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProspectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
