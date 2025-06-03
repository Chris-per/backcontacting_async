import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, share } from 'rxjs';
import { cameraData, dobotData, initCameraData, initDobotData, initStatusData, statusData} from './status-interface';
import { PidData, serialData, initSerial, initPID } from './io-data';
import { ItemInterface, DetectionItem, init_ItemInterface, init_DetectionItem } from './item-interface';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  ws!: WebSocket

  constructor(private http: HttpClient) { }

  private _sharedStream?: Observable<any>;

  last_data_received: any;

  private data_to_interface(data: any): statusData {
    var status: statusData = initStatusData()
    var dobot: dobotData = initDobotData()
    var camera: cameraData = initCameraData()
    var serial: serialData = initSerial()
    var pcb_list: ItemInterface = init_ItemInterface();
    pcb_list.description = "PCB in storage"
    var window_list : ItemInterface = init_ItemInterface();
    window_list.description = "Detected Windows"
    if("FINISHED" in data)
    {

    }
    if("STATUS" in data)
    {
      if("MESSAGE" in data)
      {
        if(data.MESSAGE != "") console.log(data.MESSAGE)
        status.message = data.MESSAGE;
      }
      if("DOBOT" in data.STATUS)
      {
        if("Position" in data.STATUS.DOBOT)
        {
          if("X" in data.STATUS.DOBOT.Position) dobot.x = data.STATUS.DOBOT.Position.X
          if("Y" in data.STATUS.DOBOT.Position) dobot.y = data.STATUS.DOBOT.Position.Y
          if("Z" in data.STATUS.DOBOT.Position) dobot.z = data.STATUS.DOBOT.Position.Z
          if("A" in data.STATUS.DOBOT.Position) dobot.a = data.STATUS.DOBOT.Position.A

        }
        if("RunningStatus" in data.STATUS.DOBOT) dobot.RunningStatus = data.STATUS.DOBOT.RunningStatus
        if("ErrorStatus" in data.STATUS.DOBOT) dobot.ErrorStatus = data.STATUS.DOBOT.ErrorStatus
        if("EnableStatus" in data.STATUS.DOBOT) dobot.EnableStatus = data.STATUS.DOBOT.EnableStatus
        if("ANGLE" in data.STATUS.DOBOT)
        {
          if("A1" in data.STATUS.DOBOT.ANGLE) dobot.a1 = data.STATUS.DOBOT.ANGLE.A1
          if("A2" in data.STATUS.DOBOT.ANGLE) dobot.a2 = data.STATUS.DOBOT.ANGLE.A2
          if("A3" in data.STATUS.DOBOT.ANGLE) dobot.a3 = data.STATUS.DOBOT.ANGLE.A3
          if("A4" in data.STATUS.DOBOT.ANGLE) dobot.a4 = data.STATUS.DOBOT.ANGLE.A4A
        }
      }
      if("CAMERA" in data.STATUS){
        if("SELECT" in data.STATUS.CAMERA) camera.select = data.STATUS.CAMERA.SELECT
      }
      try
      {
        if("PCB_LIST" in data.STATUS){
          
          for (const item of data.STATUS.PCB_LIST) 
          {
            if (item.ID != -1) 
            {
              let pcb: DetectionItem = init_DetectionItem();
              pcb.id = item.ID;
              pcb.position = {
                  x: item.POSITION.X,
                  y: item.POSITION.Y,
                  z: 0,
                  a: 0
                };
              pcb_list.type = "PCB_LIST"
              pcb_list.items.push(pcb)
          }
            
            
          }
        }
      }
      catch( error)
      {
        console.log("Error in communication service: Serial to interface PCB_LIST: "+(error))
      }
      try
      {
        if("WINDOW_LIST" in data.STATUS){
          for (const item of data.STATUS.WINDOW_LIST) 
          {
            if (item.ID != -1) 
            {
              let window = init_DetectionItem();
              window.id = item.ID;
              window.position = {
                  x: item.POSITION.X,
                  y: item.POSITION.Y,
                  z: 0,
                  a: 0
                };
              window_list.type = "WINDOW_LIST"
              window_list.items.push(window)
            }
          }
        }
      }
      catch( error)
      {
        console.log("Error in communication service: Serial to interface PCB_LIST: "+(error))
      }
      try
      {
        if("SERIAL" in data.STATUS){
          if("HEATER_TEMP" in data.STATUS.SERIAL) serial.heater_temp.value = data.STATUS.SERIAL.HEATER_TEMP
          if("HEATER_SP" in data.STATUS.SERIAL) serial.heater_sp.value  = data.STATUS.SERIAL.HEATER_SP
          if("HEATER_PWM" in data.STATUS.SERIAL) serial.heater_pwm.value  = data.STATUS.SERIAL.HEATER_PWM
          if("PISTON_POS" in data.STATUS.SERIAL) serial.piston_pos.value  = data.STATUS.SERIAL.PISTON_POS
          if("HEATER_ON" in data.STATUS.SERIAL) serial.heater_on.value  = data.STATUS.SERIAL.HEATER_ON
          if("CURING_ON" in data.STATUS.SERIAL) serial.curing_on.value  = data.STATUS.SERIAL.CURING_ON
          if("CURING_TIME_SP" in data.STATUS.SERIAL) serial.curing_time_sp.value  = data.STATUS.SERIAL.CURING_TIME_SP
          if("CURING_TIME_LEFT" in data.STATUS.SERIAL) serial.curing_time_left.value  = data.STATUS.SERIAL.CURING_TIME_LEFT
          if("HEATER_ON" in data.STATUS.SERIAL) serial.heater_on.value  = data.STATUS.SERIAL.HEATER_ON
          if("PID" in data.STATUS.SERIAL)
          {
            if("P" in data.STATUS.SERIAL.PID) serial.pid_data.d.value  = data.STATUS.SERIAL.PID.P
            if("I" in data.STATUS.SERIAL.PID) serial.pid_data.i.value  = data.STATUS.SERIAL.PID.I
            if("D" in data.STATUS.SERIAL.PID) serial.pid_data.d.value  = data.STATUS.SERIAL.PID.D
            if("TIME" in data.STATUS.SERIAL.PID) serial.pid_data.time.value  = data.STATUS.SERIAL.PID.TIME
          }
          if("DISPENSER_SP" in data.STATUS.SERIAL) serial.dispenser_sp.value  = data.STATUS.SERIAL.DISPENSER_SP
          if("DISPENSER_PRES" in data.STATUS.SERIAL) serial.dispenser_pres.value  = data.STATUS.SERIAL.DISPENSER_PRES
          if("VACUUM_SP" in data.STATUS.SERIAL) serial.vacuum_sp.value  = data.STATUS.SERIAL.VACUUM_SP
          if("BLOWOFF" in data.STATUS.SERIAL) serial.blowoff.value  = data.STATUS.SERIAL.BLOWOFF
          if("VACUUM_ON" in data.STATUS.SERIAL) serial.vacuum_on.value  = data.STATUS.SERIAL.VACUUM_ON
          if("PART_PRESENT" in data.STATUS.SERIAL) serial.part_present.value  = data.STATUS.SERIAL.PART_PRESENT
        }

      }
      catch( error)
      {
        console.log("Error in communication service: Serial to interface: "+(error))
      }
    }
    status.serial = serial
    status.dobot = dobot
    status.camera = camera
    status.pcb_list = pcb_list
    status.window_list = window_list
    return status
  }

  public openDataStream() {
    let counter = 0;

    if (this._sharedStream == undefined) {
      console.group("creating stream")
      this.ws = new WebSocket('ws://192.168.178.209:8080/data_stream');
      this._sharedStream = new Observable<MessageEvent<any>>((observer) => {
        this.ws.onmessage = observer.next.bind(observer);
        this.ws.onerror = observer.error.bind(observer);
        this.ws.onclose = observer.complete.bind(observer);
        return this.ws.close.bind(this.ws);
      }).pipe(
        filter(event => {
          if (this.ws.readyState == WebSocket.OPEN) {
            return true;
          } else {
            return false;
          }
        }),
        filter(event => {
          return event.data != undefined;
        }),
        map((event) => {
          var delta_t = Date.now() - this.last_data_received
          // console.log("delta t between data: "+delta_t)
          this.last_data_received = Date.now()
          var json_data = JSON.parse(event.data)

          var status: statusData = this.data_to_interface(json_data)  

          const byteCharacters = atob(json_data['IMAGE']);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray]);

          status.image = blob
          
          return status;
          
        }),
        share()
      );
      
    }
    return this._sharedStream;
  }

  

  public send_request(request: any)
  {
    console.log("sending request: "+request)
    this.ws.send(request)
  }
}


