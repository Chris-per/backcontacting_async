import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobotComponent } from './dobot.component';

describe('DobotComponent', () => {
  let component: DobotComponent;
  let fixture: ComponentFixture<DobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DobotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
