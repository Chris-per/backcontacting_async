import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateSetterComponent } from './coordinate-setter.component';

describe('CoordinateSetterComponent', () => {
  let component: CoordinateSetterComponent;
  let fixture: ComponentFixture<CoordinateSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateSetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
