import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nested-config-setter',
  templateUrl: './nested-config-setter.component.html',
  styleUrls: ['./nested-config-setter.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]

})
export class NestedConfigSetterComponent implements OnChanges {
  @Input() config: any;
  @Input() paramPath: string = '';
  @Input() label: string = '';
  @Output() configChange = new EventEmitter<any>();

  paramValue: any = '';


  ngOnInit() {
    this.updateParamValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] || changes['paramPath']) {
      this.updateParamValue();
    }
  }

  updateParamValue() {
    if (this.config && this.paramPath) {
      const keys = this.paramPath.split('.');
      let obj = this.config;
      for (let i = 0; i < keys.length; i++) {
        if (obj == null) break;
        obj = obj[keys[i]];
      }
      this.paramValue = obj ?? '';
    }
  }

  setConfig() {
    if (!this.paramPath) return;
    const keys = this.paramPath.split('.');
    let obj = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    const numericValue = Number(this.paramValue);
    obj[keys[keys.length - 1]] = numericValue;
    this.configChange.emit({ paramPath: this.paramPath, value: numericValue });
  }
}
