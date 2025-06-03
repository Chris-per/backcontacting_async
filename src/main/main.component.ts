import { Component } from '@angular/core';
import { DobotComponent } from "../dobot/dobot.component";
import { MatButtonModule } from '@angular/material/button'
import { SerialComponent } from "../serial/serial.component";

@Component({
  selector: 'app-main',
  imports: [
    DobotComponent,
    MatButtonModule,
    SerialComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
