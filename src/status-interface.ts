import { initSerial, serialData } from "./io-data"
import { init_ItemInterface, ItemInterface } from "./item-interface"

export interface statusData {
    dobot: dobotData,
    image: Blob,
    camera: cameraData,
    serial: serialData,
    pcb_list: ItemInterface,
    window_list: ItemInterface,
    message: string
}

export interface heaterData {
    p: number,
    i: number,
    d: number,
    t: number,
    temp_setpoint: number,
    temp_current: number
}

export interface dobotData {
  x: number,
  y: number,
  z: number,
  a: number,
  RunningStatus: string,
  ErrorStatus: string,
  EnableStatus: string,
  a1: number,
  a2: number,
  a3: number,
  a4: number

}

export interface cameraData {
    select: number
}





export function initDobotData(): dobotData {

    var dobot: dobotData = {
        x: 0,
        y: 0,
        z: 0,
        a: 0,
        EnableStatus: "",
        ErrorStatus: "",
        RunningStatus:"",
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0
    }
    return dobot
}

export function initCameraData(): cameraData {
    var cam: cameraData = {
        select: 0
    }

    return cam
}

export function initStatusData(): statusData {
    let pcb_list: ItemInterface = init_ItemInterface();
    pcb_list.type = "PCB_LIST"
    let window_list: ItemInterface = init_ItemInterface();
    window_list.type = "WINDOW_LIST"
    var status: statusData = {
        dobot: initDobotData(),
        image: new Blob(),
        camera: initCameraData(),
        serial: initSerial(),
        pcb_list: pcb_list,
        window_list: window_list,
        message: ""
    }
    return status
}

