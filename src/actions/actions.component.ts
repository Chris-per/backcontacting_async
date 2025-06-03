import { Component } from '@angular/core';
import { moveTo, pcbDetection } from '../action-interface';
import { MatButton } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { CommunicationService } from '../communication.service';
import { statusData } from '../status-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actions',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  status !: statusData;
  status_subscription?: Subscription;


  home: moveTo = {
    position: {
      x:180,
      y: 10,
      z: 80,
      a: 0
    },
    status: 0,
    description: "Move Home",
    action: ()=>{ console.log("bt move home pressed");
    },
    action_up: ()=>{ console.log("bt move home pressed released");
    },
    type: "move"
    
  };
  bottom_up_cam: moveTo = {
    position: {
      x:200,
      y: 10,
      z: 80,
      a: 0
    },
    status: 0,
    description: "Move to BU Cam",
    action: ()=>{ console.log("bt move bu cam pressed")},
    action_up: ()=>{ console.log("bt move bu cam pressed released")},
    type: "move"
    
  };
  pcb_detection : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Detection pressed");
      
      this.request_pcb_detection()
    },
    action_up: ()=>{ },
    description: "PCB Detection",
    type: "fiducial"
  };
  window_detection : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt Window Detection pressed");
      
      this.request_window_detection()
    },
    action_up: ()=>{ },
    description: "Window Detection",
    type: "fiducial"
  }
  interface_actions =  [
      this.home,
      this.bottom_up_cam,
      this.pcb_detection,
      this.window_detection
  ]
  
  constructor(
    protected communication: CommunicationService,
    ) {
      this.status_subscription = this.communication.openDataStream().subscribe(
      (      status: statusData) => 
        {
          this.status = status
          console.log(status.message)
          if( this.status.message == "PCB_DETECTION_FINISHED")
          {
            console.log("got a message back")
            this.pcb_detection.status = 0
          }
          
        }
      )
  }

  request_pcb_detection()
  {
    this.pcb_detection.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"PCB_DETECTION"}},"ID":"REQUEST_PCB_DETECTION"}'
    this.communication.send_request(request)

  }

  request_window_detection()
  {
    this.window_detection.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"WINDOW_DETECTION"}},"ID":"REQUEST_WINDOW_DETECTION"}'
    this.communication.send_request(request)

  }


}
