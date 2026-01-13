import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DispensingSettings {
  Z_PLANE: number;
  SIZE_X: number;
  SIZE_Y: number;
  X: number;
  Y: number;
  PRESSURE: number;
  SPEED: number;
  LOOPS: number;
  DWELL_TIME: number;
}

@Component({
  selector: 'app-dispensing-settings-setter',
  templateUrl: './dispensing-settings-setter.component.html',
  styleUrls: ['./dispensing-settings-setter.component.css'],
  standalone: true,
  imports: [MatInputModule, MatButtonModule]
})
export class DispensingSettingsSetterComponent {
  @Input() settings!: DispensingSettings;
  @Input() label: string = '';
  @Output() settingsChange = new EventEmitter<DispensingSettings>();

  onValueChange(key: keyof DispensingSettings, value: string | number) {
    // Update the settings object with the new value
    this.settings = {
      ...this.settings,
      [key]: Number(value)
    };
    // Emit the entire updated settings object
    this.settingsChange.emit(this.settings);
  }
}