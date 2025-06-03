import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommunicationService } from '../communication.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { selectCam } from '../action-interface';

interface Camera {
  value: string;
  viewValue: string;
  function: () => void;
}



@Component({
  selector: 'app-video',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit{

  status_subscription?: Subscription;
  private streamSub?: Subscription;
  imageSource: CanvasImageSource | null = null;
  @ViewChild('imageView') imageView?: ElementRef<HTMLCanvasElement>;

  cam0: selectCam = {
    selected: false,
    cam: 0,
    description: "Top",
    action: (value: number = 0)=>{ 
      this.select_camera(value)
      console.log("bt move home pressed");
    },
    action_up: ()=>{ console.log("bt move home pressed released");
    },
    type: "select"
  }
  cam1: selectCam = {
    selected: false,
    cam: 1,
    description: "Bottom",
    action: (value: number = 1)=>{ 
      this.select_camera(value)
      console.log("bt move home pressed");
    },
    action_up: ()=>{ console.log("bt move home pressed released");
    },
    type: "select"
  }
  interface_actions =  [
      this.cam0,
      this.cam1
  ]


  cams: Camera[] = [
    {
      value: '1', 
      viewValue: 'Mobile Cam',
      function: () => {
        // this.camera_service.sendData('{"selected_cam":0}')
      }
    },
    {
      value: '0', 
      viewValue: 'Dispenser Cam',
      function: () => {
        // this.camera_service.sendData('{"selected_cam":1}')
      }
    },
  ]
  cameraControl = new FormControl(this.cams[0].value);
  
  constructor(
  protected communication: CommunicationService,
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
  }

  ngAfterViewInit(): void {
    console.log("init video stream")
    this.streamSub = this.communication.openDataStream().subscribe(status => {
      this.drawImage(status.image);
      var selected_cam = status.camera.select
      if( selected_cam == 0) 
      {
        this.cam0.selected = true
        this.cam1.selected = false
      }
      if( selected_cam == 1) 
      {
        this.cam0.selected = false
        this.cam1.selected = true
      }
    });
    // this.camera_service.sendData('{"selected_cam":1}')
    


  }
  ngOnDestroy(): void {
    this.streamSub?.unsubscribe();
  }

  select_camera(value: number){
    var msg = '{"REQUEST":{"CAMERA":{"SELECT":'+value+'}}}'
    console.log(msg)
    try{
      this.communication.send_request(msg)
  
    }
    catch(e)
    {
      console.log(e)
    }
  }

  onInputChange(ev: Event) {
    // let value = Number((ev.target as HTMLInputElement).value);
    // this.data_service.set_value('output', 'light_pwm', value);
    // console.log(value);
  }

  formatLabel(value: number): string {
    return `${value}%`;
  }



  async drawImage(data: Blob) {
    if (this.imageView == undefined) {
      console.log("undefined")
      return;
    }
    let ctx = this.imageView.nativeElement.getContext('2d');
    // let imageData = ctx!.createImageData(2592, 1944);
    let imageBlob = new Blob([data], { type: 'image/jpeg' });
    let url = URL.createObjectURL(imageBlob);
    
    var img = new Image();
    ctx?.drawImage(img, 0, 0);   

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
    };
    img.src = url;

  }

}



