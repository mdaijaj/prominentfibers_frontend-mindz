import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovedPrUpdateComponent } from './approved-pr.component';

// import { ApprovedPrUpdateComponent } from './approved-pr.component';

describe('ApprovedPrUpdateComponent', () => {
  let component: ApprovedPrUpdateComponent;
  let fixture: ComponentFixture<ApprovedPrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedPrUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedPrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
