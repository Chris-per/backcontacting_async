import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';

export interface DetectionSettings {
  MAX_AREA: number;
  MIN_AREA: number;
  MAX_CORNERS: number;
  MIN_CORNERS: number;
  GRAYSCALE: number;
  SMOOTHING: number;
  label: string;
}

@Component({
  selector: 'app-detection-settings-setter',
  templateUrl: './detection-settings-setter.component.html',
  styleUrls: ['./detection-settings-setter.component.css'],
  imports: [
    MatInputModule,
    MatButtonModule
  ]
})
export class DetectionSettingsSetterComponent {
  @Input() settings!: DetectionSettings;
  @Input() label: string = '';
  @Output() settingsChange = new EventEmitter<DetectionSettings>();

  constructor() {
    console.log("init detection settings setter component")
    console.log(
      this.label
    )
    console.log(
      this.settings
    )
  }

  onValueChange(key: keyof DetectionSettings, value: string | number) {
    // Update the settings object with the new value
    this.settings = {
      ...this.settings,
      [key]: Number(value),
      label: this.label || this.settings.label || ''
    };
    console.log("Updated settings1:", this.settings);
    console.log("Emitting with label:", this.settings.label);
    // Emit the entire updated settings object
    this.settingsChange.emit(this.settings);
  }
}