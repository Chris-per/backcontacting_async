import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-coordinate-setter',
  templateUrl: './coordinate-setter.component.html',
  styleUrls: ['./coordinate-setter.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CoordinateSetterComponent {
  @Input() label: string = '';
  @Input() coordinates: { X: number; Y: number; Z: number; label: string } = { X: 0, Y: 0, Z: 10, label: '' };
  @Input() showA: boolean = false;
  @Output() coordinatesChange = new EventEmitter<{ X: number; Y: number; Z: number; label: string }>();

  constructor() {
    console.log(
      this.coordinates
    )
  }

  setCoordinates() {
    this.coordinatesChange.emit(this.coordinates);
  } 
}