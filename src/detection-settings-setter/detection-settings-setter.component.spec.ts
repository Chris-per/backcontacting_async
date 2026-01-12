import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionSettingsSetterComponent } from './detection-settings-setter.component';

describe('DetectionSettingsSetterComponent', () => {
  let component: DetectionSettingsSetterComponent;
  let fixture: ComponentFixture<DetectionSettingsSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetectionSettingsSetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectionSettingsSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
