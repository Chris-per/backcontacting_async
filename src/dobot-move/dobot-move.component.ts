import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Observable, Subscription } from 'rxjs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { KeyValuePipe } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-dobot-move',
  imports: [
        MatButton, 
        MatIconModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSlideToggleModule
  ],
  templateUrl: './dobot-move.component.html',
  styleUrl: './dobot-move.component.css'
})
export class DobotMoveComponent {

  constructor(
      protected communication: CommunicationService,
  
      ) {
        
    }
    
  move_jog(axis:string, direction:string) {
    console.log("jog: "+axis+direction)
    let request = '{"REQUEST":{"DOBOT":{"JOG":"'+axis+direction+'"}}}'
    this.communication.send_request(request)
  }
  stop_jog() {
    console.log("stop jog")
    let request = '{"REQUEST":{"DOBOT":{"JOG":""}}}'
    this.communication.send_request(request)
  }

}
