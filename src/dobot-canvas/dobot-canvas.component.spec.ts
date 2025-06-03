import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DobotCanvasComponent } from './dobot-canvas.component';

describe('DobotCanvasComponent', () => {
  let component: DobotCanvasComponent;
  let fixture: ComponentFixture<DobotCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DobotCanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DobotCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
