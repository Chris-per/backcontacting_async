import { Component } from '@angular/core';
import { initSerial, serialData } from '../io-data';
import { MatLabel, MatFormField, MatInput, MatInputModule } from "@angular/material/input";
import { CommunicationService } from '../communication.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { statusData } from '../status-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-temp-and-vac',
  imports: [
       MatButton, 
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './temp-and-vac.component.html',
  styleUrl: './temp-and-vac.component.css'
})
export class TempAndVacComponent {

  serial_data!: serialData;
  status_subscription!: Subscription;
  curing_temp_sp: number = 0; // Add this property

  constructor(protected communication: CommunicationService,) {
    this.serial_data = {} as serialData;
    this.serial_data = initSerial();
  
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
    this.communication.set_boolean_value(item);
  } 

  clear_boolean_value(item:string): void {
    this.communication.clear_boolean_value(item);
  }

  set_number_value(item:string, value: number): void {
    this.communication.set_number_value(item, value);
  } 



}