import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobotMoveComponent } from './dobot-move.component';

describe('DobotMoveComponent', () => {
  let component: DobotMoveComponent;
  let fixture: ComponentFixture<DobotMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DobotMoveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DobotMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
