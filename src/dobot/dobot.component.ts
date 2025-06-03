import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { dobotData, initDobotData, initStatusData, statusData } from '../status-interface';
import { CommunicationService } from '../communication.service';
import { ActionsComponent } from "../actions/actions.component";
import { VideoComponent } from "../video/video.component";
import { DobotMoveComponent } from "../dobot-move/dobot-move.component";
import { DobotCanvasComponent } from "../dobot-canvas/dobot-canvas.component";
import { ItemWindowComponent } from "../item-window/item-window.component";
import { DetectionItem, init_DetectionItem } from '../item-interface';

@Component({
  selector: 'app-dobot',
  imports: [ActionsComponent, VideoComponent, DobotMoveComponent, DobotCanvasComponent, ItemWindowComponent],
  templateUrl: './dobot.component.html',
  styleUrl: './dobot.component.css'
})
export class DobotComponent {
  dobot_status!: dobotData;
  status !: statusData;
  status_subscription?: Subscription;

  
  constructor(
    protected communication: CommunicationService,

    ) {
      console.log("init dobot component done")
      this.dobot_status = initDobotData();
      console.log("After_init dobot component done")
    this.status_subscription = this.communication.openDataStream().subscribe(
      (      status: statusData) => 
        {
          this.status = status
          this.dobot_status = status.dobot
          
        }
      )
      
    

      

  }

  ngAfterInit():any {
    
 
  }

  ngAfterViewInit(): void {
       
    console.log("After_init dobot component done")
    this.status_subscription = this.communication.openDataStream().subscribe(
      (      status: statusData) => 
        {
          this.status = status
          this.dobot_status = status.dobot
          
        }
      )
  }

}
