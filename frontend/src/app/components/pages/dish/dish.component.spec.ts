import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishComponent } from './dish.component';

describe('ReservationListComponent', () => {
  let component: DishComponent;
  let fixture: ComponentFixture<DishComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
