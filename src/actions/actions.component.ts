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
    action: ()=>{ this.request_move_home()
    },
    action_up: ()=>{ console.log("bt move home pressed released");
    },
    type: "move"
    
  };
  place_position: moveTo = {
    position: {
      x:200,
      y: 220,
      z: 60,
      a: 0
    },
    status: 0,
    description: "Move Home",
    action: ()=>{ this.request_move_home()
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
  };
  pcb_pickup : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Pickup pressed");
      this.request_pcb_pickup()
    },
    action_up: ()=>{ },
    description: "PCB Pickup",
    type: "fiducial"
  };
  pcb_align : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Align pressed");
      this.request_pcb_align()
    },
    action_up: ()=>{ },
    description: "PCB Align",
    type: "fiducial"
  };
  pcb_place : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Place pressed");
      this.request_pcb_place()
    },
    action_up: ()=>{ },
    description: "PCB Place",
    type: "fiducial"
  };
  dispense_adhesive : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Align pressed");
      this.request_dispense_adhesive()
    },
    action_up: ()=>{ },
    description: "DISP ADH",
    type: "fiducial"
  };
    cure_pcb : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt Cure PCB pressed");
      this.request_cure_pcb()
    },
    action_up: ()=>{ },
    description: "CURE",
    type: "fiducial"
  };
  auto_place_single : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt PCB Align pressed");
      this.request_auto_single()
    },
    action_up: ()=>{ },
    description: "AUTO Single",
    type: "fiducial"
  };
  clear_dobot_error : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt clear_dobot_error pressed");
      this.request_clear_dobot_error()
    },
    action_up: ()=>{ },
    description: "clr Error",
    type: "fiducial"
  };
  enable_dobot : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt enable_dobot pressed");
      this.request_enable_robot()
    },
    action_up: ()=>{ },
    description: "enable Dobot",
    type: "fiducial"
  };
  calibrate_camera : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt calibrate_camera pressed");
      this.request_calibrate_camera()
    },
    action_up: ()=>{ },
    description: "calibrate Cam",
    type: "fiducial"
  };
  emergency_stop : pcbDetection = {
    status: 0,
    action: ()=>{ 
      console.log("bt emergency stop pressed");
      this.request_emergency_stop()
    },
    action_up: ()=>{ },
    description: "E_Stop",
    type: "fiducial"
  };
  move_to_calibration_point: pcbDetection = {
    status: 0,
    action: ()=>{
      console.log("bt move to calibration point pressed");
      this.request_move_calibration_point()
    },
    action_up: ()=>{ },
    description: "Move to Cal Point",
    type: "fiducial"
  }
  move_to_module_origin: pcbDetection = {
    status: 0,
    action: ()=>{
      console.log("bt move to module origin pressed");
      this.request_move_module_origin()
    },
    action_up: ()=>{ },
    description: "Move to Mod Origin",
    type: "fiducial"
  }
  interface_actions =  [
      this.home,
      this.bottom_up_cam,
      this.move_to_calibration_point,
      this.move_to_module_origin,
      this.pcb_detection,
      this.window_detection,
      this.pcb_pickup,
      this.pcb_align,
      this.pcb_place,
      this.dispense_adhesive,
      this.cure_pcb,
      this.auto_place_single,
      this.clear_dobot_error,
      this.enable_dobot,
      this.calibrate_camera,
      this.emergency_stop,
      
  ]
  
  constructor(
    protected communication: CommunicationService,
    ) {
      this.status_subscription = this.communication.openDataStream().subscribe(
      (      status: statusData) => 
        {
          this.status = status
          // console.log(status.message)
          if( this.status.message == "PCB_DETECTION_FINISHED")
          {
            console.log("got a message back")
            this.pcb_detection.status = 0
          }
          if( this.status.message == "WINDOW_DETECTION_FINISHED")
          {
            console.log("got a message back")
            this.window_detection.status = 0
          }
          if( this.status.message == "WINDOW_DETECTION ERROR")
          {
            console.log("got a message back")
            this.window_detection.status = -1
          }
          if( this.status.message == "PCB_PICKUP_FINISHED")
          {
            console.log("got a message back")
            this.pcb_pickup.status = 0
          }
          if( this.status.message == "MOVE_HOME_FINISHED")
          {
            console.log("got a message back")
            this.home.status = 0
            this.move_to_calibration_point.status = 0
            this.move_to_module_origin.status = 0
          }
          if( this.status.message == "PCB_ALIGN_FINISHED")
          {
            console.log("got a message back")
            this.pcb_align.status = 0
          }
          if( this.status.message == "PCB_ALIGN_FINISHED ERROR")
          {
            console.log("got a message back")
            this.pcb_align.status = -1

          }
          if( this.status.message == "PCB_PLACE_FINISHED")
          {
            console.log("got a message back")
            this.pcb_place.status = 0
          }
          if( this.status.message == "PCB_PLACE ERROR")
          {
            console.log("got a message back")
            this.pcb_place.status = -1

          }
          if( this.status.message == "DISPENSE_ADHESIVE_FINISHED")
          {
            console.log("got a message back")
            this.dispense_adhesive.status = 2

          }
          if( this.status.message == "DISPENSE_ADHESIVE ERROR")
          {
            console.log("got a message back")
            this.dispense_adhesive.status = -1

          }
          if( this.status.message == "AUTO_SINGLE_FINISHED")
          {
            console.log("got a message back")
            this.auto_place_single.status = 2

          }
          if( this.status.message == "AUTO_SINGLE ERROR")
          {
            console.log("got a message back")
            this.auto_place_single.status = -1

          }
          if( this.status.message == "CURE_PCB_FINISHED")
          {
            console.log("got a message back")
            this.cure_pcb.status = 2

          }
          if( this.status.message == "CURE_PCB ERROR")
          {
            console.log("got a message back")
            this.cure_pcb.status = -1

          }
          if( this.status.message == "EMERGENCY_STOP_FINISHED")
          {
            console.log("got a message back")
            this.emergency_stop.status = 0
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

  request_pcb_pickup()
  {
    this.pcb_pickup.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"PCB_PICKUP"}},"ID":"REQUEST_PCB_PICKUP"}'
    this.communication.send_request(request)

  }
  request_pcb_align()
  {
    this.pcb_align.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"PCB_ALIGN"}},"ID":"REQUEST_PCB_ALIGN"}'
    this.communication.send_request(request)

  }
  request_pcb_place()
  {
    this.pcb_detection.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"PCB_PLACE"}},"ID":"REQUEST_PCB_PLACE"}'
    this.communication.send_request(request)

  }
  request_move_home()
  {
    this.home.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"MOVE_HOME"}},"ID":"REQUEST_MOVE_HOME"}'
    this.communication.send_request(request)

  }

  request_dispense_adhesive()
  {
    this.dispense_adhesive.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"DISPENSE_ADHESIVE"}},"ID":"REQUEST_DISPENSE_ADHESIVE"}'
    this.communication.send_request(request)

  }

  request_cure_pcb()
  {
    this.cure_pcb.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"CURE_PCB"}},"ID":"REQUEST_CURE_PCB"}'
    this.communication.send_request(request)

  }

  request_auto_single()
  {
    this.auto_place_single.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"AUTO_SINGLE"}},"ID":"REQUEST_AUTO_SINGLE"}'
    this.communication.send_request(request)

  }
  request_abort()
  {
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"ABORT"}},"ID":"ABORT"}'
    this.communication.send_request(request)
  }
  request_clear_dobot_error()
  {
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"CLEAR_DOBOT_ERROR"}},"ID":"CLEAR_DOBOT_ERROR"}'
    this.communication.send_request(request)
  }
  request_enable_robot()
  {
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"ENABLE_ROBOT"}},"ID":"ENABLE_ROBOT"}'
    this.communication.send_request(request)
  }
  request_calibrate_camera()
  {
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"CALIBRATE_CAMERA"}},"ID":"CALIBRATE_CAMERA"}'
    this.communication.send_request(request)
  }

  request_emergency_stop()
  {
    this.emergency_stop.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"EMERGENCY_STOP"}},"ID":"EMERGENCY_STOP"}'
    this.communication.send_request(request)
  }

  request_move_calibration_point()
  {
    this.move_to_calibration_point.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"CALIBRATION"}},"ID":"REQUEST_CALIBRATION_POINT"}'
    this.communication.send_request(request)
  }

  request_move_module_origin()
  {
    this.move_to_module_origin.status = 1
    let request = '{"REQUEST":{"CAMERA":{"TYPE":"MODULE_ORIGIN"}},"ID":"REQUEST_MOVE_MODULE_ORIGIN"}'
    this.communication.send_request(request)
  }


}