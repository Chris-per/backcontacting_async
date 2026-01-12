import { Component } from '@angular/core';
import { DobotComponent } from "../dobot/dobot.component";
import { MatButtonModule } from '@angular/material/button'
import { SerialComponent } from "../serial/serial.component";
import { ConfigComponent } from '../config/config.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    DobotComponent,
    MatButtonModule,
    SerialComponent,
    ConfigComponent,
    RouterOutlet,
    RouterLink
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {}
