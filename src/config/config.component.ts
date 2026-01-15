  
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../communication.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { statusData } from '../status-interface';
import { CoordinateSetterComponent } from "../coordinate-setter/coordinate-setter.component";
import { DetectionSettings, DetectionSettingsSetterComponent } from "../detection-settings-setter/detection-settings-setter.component";
import { DispensingSettingsSetterComponent } from '../dispensing-settings-setter/dispensing-settings-setter.component';
import { NestedConfigSetterComponent } from '../nested-config-setter/nested-config-setter.component';

@Component({
  selector: 'app-config',
  imports: [
    CommonModule,
    FormsModule,
    CoordinateSetterComponent,
    DetectionSettingsSetterComponent,
    DispensingSettingsSetterComponent,
    NestedConfigSetterComponent

],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit, OnDestroy {

    // ...existing code...

  status = { data: {} };
  loading = false;
  status_subscription!: Subscription;
  // remote_config interface will be defined later
  remote_config: any;

  constructor(private communication: CommunicationService) {

     this.status_subscription = this.communication.openDataStream().subscribe((status: statusData) => {
          this.status = status;

        });
  }
  ngOnDestroy(): void {
    if (this.status_subscription) {
      this.status_subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.requestConfig();
  }

  requestConfig() {
    this.status.data = {};
    this.loading = true;
    this.communication.request_config().subscribe((data: any) => {
        this.remote_config = data;
        this.status.data = data;
        this.loading = false;
        console.log("Config data received:", data);
        console.log("DETECTION_SETTINGS_PCB DATA:", this.remote_config.DETECTION_SETTINGS_PCB );
    });
  }

  onCalibrationChanged(newCoords: { label: string; X: number; Y: number; Z: number }) {
    this.remote_config.CALIBRATION = newCoords;
    // Add any additional logic here, e.g. send to backend if needed
    let data_to_send = {
      [newCoords.label]: {
        X: newCoords.X,
        Y: newCoords.Y,
        Z: newCoords.Z
      }
    };
    this.communication.set_config(data_to_send);
    console.log('Calibration coordinates updated:', newCoords);
  }

  onDetectionSettingsChanged(newSettings: DetectionSettings) {
    this.remote_config.DETECTION_SETTINGS = newSettings;
    console.log("New detection settings1:", newSettings);
    let data_to_send = {
      "UEYE": {
      [newSettings.label]: {
        MAX_AREA: newSettings.MAX_AREA,
        MIN_AREA: newSettings.MIN_AREA,
        MAX_CORNERS: newSettings.MAX_CORNERS,
        MIN_CORNERS: newSettings.MIN_CORNERS,
        GRAYSCALE: newSettings.GRAYSCALE,
        SMOOTHING: newSettings.SMOOTHING
      }}
    };
    this.communication.set_config(data_to_send);
    console.log('Detection settings updated:', data_to_send);
  }

  onDispensingSettingsChanged($newSettings: any) {
    // Update the local config with the new settings
    this.remote_config.DISPENSING = $newSettings;
    // Send the entire DISPENSING config, not just the changed part
    let data_to_send = {
      "DISPENSING": this.remote_config.DISPENSING
    };
    this.communication.set_config(data_to_send);
    console.log('Full DISPENSING config sent:', data_to_send);
  }

  onNestedConfigChanged({ paramPath, value }: { paramPath: string, value: any }) {
  if (paramPath) {
    const keys = paramPath.split('.');
    let obj = this.remote_config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    // Prepare the minimal update object
    let updateObj: any = {};
    let pointer = updateObj;
    for (let i = 0; i < keys.length - 1; i++) {
      pointer[keys[i]] = {};
      pointer = pointer[keys[i]] = {};
    }
    pointer[keys[keys.length - 1]] = value;
    this.communication.set_config(updateObj);
      // Force a deep clone to trigger change detection
      this.remote_config = JSON.parse(JSON.stringify(this.remote_config));
    console.log('Nested config updated:', updateObj);
  }
}


}