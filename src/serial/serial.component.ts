import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { initDobotData, statusData } from '../status-interface';
import { initSerial, serialData, serial_io } from '../io-data';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-serial',
  imports: [
    MatButton, 
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './serial.component.html',
  styleUrl: './serial.component.css'
})



export class SerialComponent {
status_subscription?: Subscription;
serial_data!: serialData;
curing_time_sp !: number;
curing_temp_sp !: number;
pid_p!: number;
pid_i!: number;
pid_d!: number;
pid_time!: number;
dispensing_sp !: number;

  constructor(
    protected communication: CommunicationService,

    ) {
      console.log("init dobot component done")
      this.serial_data = initSerial();
      this.curing_time_sp = 60;
      this.curing_temp_sp = 150;
      this.pid_p = 400;
      this.pid_i = 1;
      this.pid_d = 0;
      this.pid_time = 10;
      this.dispensing_sp = 0;
      
  }

  

  ngAfterViewInit(): void {
         
    console.log("After_init dobot component done")
    this.status_subscription = this.communication.openDataStream().subscribe(
      (      status: statusData) => 
        {
          this.serial_data = status.serial
        }
      )
  }

  set_boolean_value(item:string): void {
    this.communication.set_boolean_value(item)
  }
    
  clear_boolean_value(item:string): void {
    this.communication.clear_boolean_value(item)
  }
  
  set_number_value(item:string, value: number): void {
    this.communication.set_number_value(item, value)
  } 
   
  set_pid_value(item:string, value: number): void {
    this.communication.set_pid_value(item, value)
  }
 
  set_curing_time(value: number): void {
    this.communication.set_curing_time(value)
  }
    


}
