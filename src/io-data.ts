export interface serialData {
    heater_temp: Analog,
    heater_sp: Analog,
    heater_pwm: Analog,
    piston_pos: Digital,
    heater_on: Digital,
    curing_on: Digital,
    curing_time_sp: Analog,
    curing_time_left: Analog,
    pid_data: PidData,
    dispenser_sp: Analog,
    dispenser_pres : Analog,
    vacuum_sp: Digital,
    blowoff: Digital,
    vacuum_on: Digital,
    part_present: Digital
}

export interface PidData {
  p: Analog,
  i: Analog,
  d: Analog,
  time: Analog

}

export interface Analog{
    name: String | undefined;
    value: number;
    is_input: boolean | undefined;
    unit: String | undefined;

}

export class Digital{
  name: String | undefined;
  value!: boolean;
  is_input: boolean | undefined;
}

export interface serial_io {
    value: number|boolean
    is_input: boolean
    description : string,
    action?: (value?: number|boolean) => void;
    action_up?: (value?: number|boolean) => void;
    unit?: string;
}

export function initSerial(): serialData {

  var heater_temp: Analog = {
    "is_input": false,
    "name": "HEATER Temp",
    "unit": "°C",
    "value": -10,
  }
  var heater_sp: Analog = {
    "is_input": true,
    "name": "HEATER Setpoint",
    "unit": "°C",
    "value": -10
  }
  var heater_pwm: Analog = {
    "is_input": true,
    "name": "HEATER pwm",
    "unit": "%",
    "value": 50
  }

  var piston_pos: Digital = {
    "is_input": false,
    "name": "Piston",
    "value": false
  }
  var heater_on: Digital = {
    "is_input": false,
    "name": "Heater enabled",
    "value": false
  }
  var curing_on: Digital = {
    "is_input": false,
    "name": "Curing running",
    "value": false
  }
  var curing_time_sp: Analog = {
    "is_input": true,
    "name": "Curing Time Setpoint",
    "unit": "s",
    "value": 60
  }
  var curing_time_left: Analog = {
    "is_input": false,
    "name": "Curing Time left",
    "unit": "s",
    "value": 60
  }

  var dispenser_sp: Analog = {
    "is_input": true,
    "name": "Dispenser Setpoint",
    "unit": "%",
    "value": 50
  }
  
  var dispenser_pres : Analog = {
    "is_input": false,
    "name": "Dispenser Value",
    "unit": "V",
    "value": 0
  }
   
  var vacuum_sp: Digital = {
    "is_input": true,
    "name": "Vacuum Setpoint",
    "value": false
  }
  
  var  blowoff: Digital = {
    "is_input": true,
    "name": "Blowoff Setpoint",
    "value": false
  }
  
  var vacuum_on: Digital = {
    "is_input": false,
    "name": "Vacuum Status",
    "value": false
  }

  var part_present: Digital = {
    "is_input": false,
    "name": "Part Present",
    "value": false
  }

  var pid_data: PidData = initPID();

  var serial_data: serialData = {
    heater_temp,
    heater_sp,
    heater_pwm,
    piston_pos,
    heater_on,
    curing_on,
    curing_time_sp,
    curing_time_left,
    pid_data,
    dispenser_sp,
    dispenser_pres,
    vacuum_sp,
    blowoff,
    vacuum_on,
    part_present,
  };



  return serial_data;
  
}

export function initPID(): PidData {

  var p :Analog = {
    "is_input": false,
    "name": "P value",
    "unit": "",
    "value": 8
  }
  var i :Analog = {
    "is_input": false,
    "name": "I value",
    "unit": "",
    "value": 1
  }
  var d :Analog = {
    "is_input": false,
    "name": "D value",
    "unit": "",
    "value": 1
  }
  var time :Analog = {
    "is_input": false,
    "name": "Time",
    "unit": "s",
    "value": 1
  }
  var pid: PidData = {
    p,
    i,
    d,
    time
  }
  return pid;




}

