import { Component, Input, TrackByFunction } from '@angular/core';
import {CommonModule} from '@angular/common';
import { DetectionItem, init_ItemInterface, ItemInterface } from '../item-interface';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { statusData } from '../status-interface';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-window',
  imports: [
    ScrollingModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './item-window.component.html',
  styleUrl: './item-window.component.css'
})
export class ItemWindowComponent {

  @Input() item_list!: ItemInterface;
  // item_list!: ItemInterface;

  
  constructor(protected communication: CommunicationService) 
  {       
    this.item_list = init_ItemInterface();
  }
  
  ngAfterViewInit(): void {
   
  }
  
  send_delete(type: String, id: number) {
    try
    {
      console.log("send delete: "+type)
      if(type == "PCB_LIST") type="PCB_DELETE"
      if(type == "WINDOW_LIST") type="WINDOW_DELETE"
      let request = '{"REQUEST":{"CAMERA":{"TYPE":"'+type+'","ID":'+id+'}}}'
      this.communication.send_request(request);
      console.log(this.item_list)
    }
    catch(error)
    {
      console.log("errorsending delete: "+error)
    }
  }


}


