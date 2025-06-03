
export interface coordinate  {
    x: number,
    y: number,
    z: number,
    a: number
}

export interface moveTo {
    position: coordinate
    status: number
    description : string,
    action: (value?: number) => void;
    action_up: (value?: number) => void;
    type: string
}

export interface pcbDetection {
    status: number
    description : string,
    action: (value?: number) => void;
    action_up: (value?: number) => void;
    type: string
}

export interface selectCam {
    cam: number
    selected: boolean
    description : string,
    action: (value?: number) => void,
    action_up: (value?: number) => void,
    type: string
}

export function init_coordinate(): coordinate {
    var coord: coordinate = {
        x: 0,
        y: 0,
        z: 0,
        a: 0
    }
    return coord
}
export function init_moveTo() : moveTo{
    var move_to : moveTo = {
        position: init_coordinate(),
        status: 0,
        action: () =>{},
        action_up: () =>{},
        description: "",
        type:"move"
    }
    return move_to
}

export function init_pcb_detection() : pcbDetection{
    var pcb_detection : pcbDetection = {
        status: 0,
        action: () =>{},
        action_up: () =>{},
        description: "",
        type:"move"
    }
    return pcb_detection
}