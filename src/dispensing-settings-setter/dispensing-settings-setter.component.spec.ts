import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensingSettingsSetterComponent } from './dispensing-settings-setter.component';

describe('DispensingSettingsSetterComponent', () => {
  let component: DispensingSettingsSetterComponent;
  let fixture: ComponentFixture<DispensingSettingsSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DispensingSettingsSetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispensingSettingsSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
