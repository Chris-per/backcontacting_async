import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';
// import { Coordinate, Line, Block, model_item, Style, model, grid_style_secondary, robot_style, remove_item, CanvasCalc, Canvas_Data, Circle } from '../canvas-model';

import { CommunicationService } from '../communication.service';
import { initStatusData, statusData } from '../status-interface';
import { Canvas_Data, CanvasCalc, Coordinate } from '../canvas-model';



@Component({
  selector: 'app-dobot-canvas',
  standalone: true,
  imports: [],
  templateUrl: './dobot-canvas.component.html',
  styleUrl: './dobot-canvas.component.css'
})
export class DobotCanvasComponent implements AfterViewInit {

  // its important myCanvas matches the variable name in the template
  // @ViewChild('myCanvas', { static: false }) myCanvas!: { nativeElement: HTMLCanvasElement | undefined; getContext: (arg0: string) => CanvasRenderingContext2D | undefined; };

  @ViewChild('myCanvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  canvas?: HTMLCanvasElement;
  canvas_calc: CanvasCalc;

  canvas_data: Canvas_Data;
  context!: CanvasRenderingContext2D;
  status!:statusData;
  private streamSub?: Subscription;
  // grid_model = model;

  constructor(private communication: CommunicationService) {
    this.status = initStatusData()
    this.canvas_data =
    {
      range_mm_start: 
      {
        x: -350,
        y: -350,
        z: 0
      },
      range_mm_end: 
      {
        x: 350,
        y: 350,
        z: 50
      },
      canvas_width: 300,
      canvas_height: 300
    } 
    this.canvas_calc = new CanvasCalc(this.canvas_data);
  }

  canvas_config = {
    "WIDTH_MM":351,
    "HEIGHT_MM":351,
    "INTERVAL":100,
    "ROBOT_RANGE_MIN_MM": 100,
    "ROBOT_RANGE_MAX_MM": 380,

  }

  ngOnInit(): void {
    // console.log(this.canvas);

  }



  ngAfterViewInit(): void {
    this.canvas = this.canvasRef?.nativeElement;
    
    if (this.canvas != undefined) {
      let optionalContext = this.canvas.getContext("2d");
      // this.canvas_calc.set_canvas(this.canvas.width, this.canvas.height);
      if (optionalContext == undefined) {
        throw new Error('Clould not get cavnas drawing context');
      } else {
        this.context = optionalContext;
        this.canvas_data.canvas_height = this.context.canvas.height;
        this.canvas_data.canvas_width = this.context.canvas.width;
        this.canvas_calc.set_canvas(this.canvas.width, this.canvas.height);
        // this.grid_model.push(this.canvas_calc.draw_main_grid());
        // this.canvas_calc.render(this.context, this.grid_model);
        this.canvas_calc.render(this.context);
      }
    } else {
      throw new Error('Clould not get cavnas drawing context');
    }
    // console.log("calling render data");
    // this.render(this.context, this.grid_model);

    // ----------------------------------------------------
    let robot_pos_mm: Coordinate = {
      x: 200, 
      y: 70,
      z: 0
    }
    this.canvas_calc.draw_robot(robot_pos_mm, 180)
    this.canvas_calc.render(this.context);
    //----------------------------------
    this.streamSub = this.communication.openDataStream().subscribe(status => {
      
      let robot_pos =   
      {
        x: status.dobot.x,
        y: status.dobot.y,
        z: status.dobot.z,
        a: status.dobot.a,
      }
      let robot_angle = status.dobot.a
       
      
      this.canvas_calc.draw_robot(robot_pos, robot_angle);
      this.canvas_calc.render(this.context);
      // var value = [Number(array[0]).toFixed(1),Number(array[1]).toFixed(1),Number(array[2]).toFixed(1)];

    });

  }

  ngOnDestroy(): void {
    this.streamSub?.unsubscribe();
  }


}
