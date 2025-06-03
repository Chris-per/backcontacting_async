
import data from './config.json'


type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = string;

type DASH_LINE = [number, number];


export type model_item = Line | Rect | Circle| Text | Grid; 

export interface global_values {
    style: Style,
    layer?: number
}

export interface Style {
    line_color: Color,
    line_width?: number,
    line_type?: DASH_LINE,
    fill_color?: Color,
    text_font?: string,   
    // ctx.font = "bold italic 50px Arial";

}

export interface Coordinate {
    x: number,
    y: number,
    z: number,
    a?: number
}

export interface Vector {
    r: number,
    phi: number,
    dx: number,
    dy: number,
    origin?: Coordinate

}

export interface Line extends global_values{
    type : String,
    start: Coordinate,
    end: Coordinate,
}

export interface Rect extends global_values{
    type : String,
    center: Coordinate,
    width: number,
    height: number,
    angle: number,
}

export interface Circle extends global_values{
    type : String,
    center: Coordinate,
    radius: number,
}

export interface Text extends global_values{

    type : String,
    start: Coordinate,
    text: string
}

export interface Grid extends global_values{
    type : String,
    center_pos?: Coordinate,
    size_x_mm: number,
    size_y_mm: number,
    interval: number

}


export const grid_style: Style = {
    line_color: 'rgba(0, 0,0, 0.8)',
    line_width: 1
  }

export const grid_style_secondary: Style = {
line_color: 'rgba(0,0,0, 0.2)',
line_width: 1,
text_font: "10px Arial",
fill_color: 'rgba(0,0,0, 0.8)',

}

export const robot_style: Style = {
    line_color: 'red',
    line_width: 1
    }

export interface Block {
    "id": String,
    "items":Array<Line | Rect | Circle| Text | Grid>
}

export const model: Array<Block> =
    [  
    ]

export type Canvas_Data = 
{
    range_mm_start: Coordinate,
    range_mm_end: Coordinate,
    canvas_width: number,
    canvas_height: number,
    // mm_per_px: number
}



export class CanvasCalc 
{
    px_x: number;
    px_y: number;
    mm_x_total: number;
    mm_y_total: number;
    mm_per_px_x: number;
    mm_per_px_y: number;
    canvas_start_mm: Coordinate;
    canvas_end_mm: Coordinate;
    canvas_height: number;
    canvas_width: number;
    text_offset_left_px = data.CANVAS.TEXT_OFFSET_LEFT_PX; 
    text_offset_right_px = data.CANVAS.TEXT_OFFSET_RIGHT_PX; 
    text_offset_bottom_px = data.CANVAS.TEXT_OFFSET_BOTTOM_PX; 
    text_offset_top_px = data.CANVAS.TEXT_OFFSET_TOP_PX; 
    grid_interval_mm = data.CANVAS.GRID_INTERVAL;
    grid_model: Array<Block>;
    gripper_coord: Coordinate;
    cam1_coord: Coordinate;
    heater_coord: Coordinate;
    cam_vector: Vector;
    heater_vector: Vector;

    constructor(canvas_data: Canvas_Data )
    {
        this.canvas_height = canvas_data.canvas_height;
        this.canvas_width = canvas_data.canvas_width;

        this.px_x = canvas_data.canvas_width-this.text_offset_left_px - this.text_offset_right_px;
        this.px_y = canvas_data.canvas_height-this.text_offset_top_px - this.text_offset_bottom_px;
        //calc visible length
        this.mm_x_total = canvas_data.range_mm_end.x - canvas_data.range_mm_start.x;
        this.mm_y_total = canvas_data.range_mm_end.y - canvas_data.range_mm_start.y;
        //range of Canvas in mm
        this.canvas_start_mm = canvas_data.range_mm_start;
        this.canvas_end_mm = canvas_data.range_mm_end;
        //calc visible pixel to mm ratio
        this.mm_per_px_x = this.mm_x_total/this.px_x;
        this.mm_per_px_y = this.mm_y_total/this.px_y;
        // console.log("total px for drawing in x: "+this.px_x)
        // console.log("total px for drawing in y: "+this.px_y)
        this.grid_model = [];
        this.gripper_coord = {
            x: data.POSITION_BOTTOM_UP.GRIPPER.X, 
            y: data.POSITION_BOTTOM_UP.GRIPPER.Y, 
            z: data.POSITION_BOTTOM_UP.GRIPPER.Z
        }
        this.cam1_coord = {
            x: data.POSITION_BOTTOM_UP.CAM.X, 
            y: data.POSITION_BOTTOM_UP.CAM.Y, 
            z: data.POSITION_BOTTOM_UP.CAM.Z
        }
        this.heater_coord = {
            x: data.POSITION_BOTTOM_UP.HEATER.X, 
            y: data.POSITION_BOTTOM_UP.HEATER.Y, 
            z: data.POSITION_BOTTOM_UP.HEATER.Z
        }
        console.log("calc cam vector");
        this.heater_vector = this.calc_vector( this.heater_coord, this.gripper_coord);
        // this.cam_vector = this.rotate_vector(this.cam_vector, Math.PI/2);
        console.log("calc heater vector");
        this.cam_vector = this.calc_vector(this.cam1_coord, this.gripper_coord);
        console.log("Cam Vector: ")
        console.log(this.cam_vector);
        console.log(this.cam_vector.phi*180/Math.PI);
        console.log("Heater Vector: ")
        console.log(this.heater_vector);
        console.log(this.heater_vector.phi*180/Math.PI);
        
        
    }

    calc_vector(coord1: Coordinate, coord2: Coordinate, mirror?: Boolean): Vector
    {
        let vector: Vector = {
            r: 0,
            phi: 0,
            dx: 0,
            dy: 0
        }
        let dx = coord2.x - coord1.x;
        let dy = coord2.y - coord1.y;
        if(mirror == true) 
        {
            dx = dx*-1;
            dy = dy*-1;
        }
        console.log("dx: "+dx+" dy: "+dy);
        vector.r =   Math.sqrt(dx*dx + dy*dy);
        vector.phi = Math.atan2(dy,dx);
        vector.dx = dx;
        vector.dy = dy;
        vector.origin = coord1;
        return vector
    }
    rotate_vector(vector: Vector, angle: number): Vector{
        let new_vector: Vector = 
        {
            phi: 0,
            r: 0,
            dx: 0,
            dy: 0,
            origin: vector.origin
        }
        new_vector.r = vector.r;
        new_vector.phi = vector.phi + angle;
        new_vector.dx = vector.r * Math.cos(new_vector.phi);
        new_vector.dy = vector.r * Math.sin(new_vector.phi);

        return new_vector;
    }

    set_canvas(canvas_width: number, canvas_height:number)
    {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.recalc_values();

    }

    recalc_values()
    {
        this.px_x = this.canvas_width-this.text_offset_left_px - this.text_offset_right_px;
        this.px_y = this.canvas_height-this.text_offset_top_px - this.text_offset_bottom_px;
        //calc visible length
        this.mm_x_total = this.canvas_end_mm.x - this.canvas_start_mm.x;
        this.mm_y_total = this.canvas_end_mm.y - this.canvas_start_mm.y;        
        //calc visible pixel to mm ratio
        this.mm_per_px_x = this.mm_x_total/this.px_x;
        this.mm_per_px_y = this.mm_y_total/this.px_y;

        // console.log("total px for drawing in x: "+this.px_x)
        // console.log("total px for drawing in y: "+this.px_y)
    }

    mm_to_px(coord: Coordinate): Coordinate
    {
        // coordintes in mm will be converted to px
        let px_coord :Coordinate =
        {
            x: 0,
            y: 0,
            z: 0
        }
        px_coord.a = coord.a;
        px_coord.x = this.text_offset_left_px+(coord.x-this.canvas_start_mm.x)/this.mm_per_px_x;
        px_coord.y = (coord.y-this.canvas_start_mm.y)/this.mm_per_px_y;
        px_coord.y = this.canvas_height - px_coord.y - this.text_offset_bottom_px;
        // console.log("x:"+coord.x+"mm -> "+px_coord.x+"px");
        // console.log("y:"+coord.y+"mm -> "+px_coord.y+"px");
        return px_coord
    }

    draw_main_grid()
    {
        
        let item_list = [];
        let line: Line = 
        {
            start: {  x:0, y: this.canvas_start_mm.y, z: 0},
            end: { x:0, y: this.canvas_end_mm.y, z: 0 },
            style: grid_style,
            type: "Line"
        }
        item_list.push(line)
        line = 
        {
            start: { x:this.canvas_start_mm.x, y: 0, z: 0},
            end: {x: this.canvas_end_mm.x, y: 0,z: 0 },
            style: grid_style,
            type: "Line"
        }
        item_list.push(line)
        // Draw secondary grid
        for(let x=this.grid_interval_mm; x<=this.canvas_end_mm.x; x+= this.grid_interval_mm)
        {
            //X-Positive
            line = {
                start: {x:x, y: this.canvas_start_mm.y, z: 0 }, 
                end:{ x:x, y: this.canvas_end_mm.y, z: 0 },
                style: grid_style_secondary,
                type: "Line"
            }
            item_list.push(line)
            let text = {
                start: {x:x-8, y: this.canvas_start_mm.y-16, z: 0 }, 
                text: x,
                style: grid_style_secondary,
                type: "Text",    
            }
            item_list.push(text)
            //----------------
            //X-Negative
            line = {
                start: {x:-x, y: this.canvas_start_mm.y, z: 0 }, 
                end:{ x:-x, y: this.canvas_end_mm.y, z: 0 },
                style: grid_style_secondary,
                type: "Line"
            }
            item_list.push(line)
            text = {
                start: {x:-x-12, y: this.canvas_start_mm.y-16, z: 0 }, 
                text: -x,
                style: grid_style_secondary,
                type: "Text",    
            }
            item_list.push(text)
            //-----------------------
            //Y-positive
            line = {
                start: {x:this.canvas_start_mm.x, y: x, z: 0 }, 
                end:{ x:this.canvas_end_mm.y, y: x, z: 0 },
                style: grid_style_secondary,
                type: "Line"
            }
            item_list.push(line)
            text = {
                start: {x:this.canvas_start_mm.x -24, y: x-3, z: 0 }, 
                text: x,
                style: grid_style_secondary,
                type: "Text",    
            }
            item_list.push(text)
            //------------------------------
            //Y-Negative
            line = {
                start: {x:this.canvas_start_mm.x, y: -x, z: 0 }, 
                end:{ x:this.canvas_end_mm.y, y: -x, z: 0 },
                style: grid_style_secondary,
                type: "Line"
            }
            item_list.push(line)
            text = {
                start: {x:this.canvas_start_mm.x -28, y: -x-3, z: 0 }, 
                text: -x,
                style: grid_style_secondary,
                type: "Text",    
            }
            item_list.push(text)
            
        }
        //-----------------------------------------
        remove_item("main_grid", this.grid_model);
        let blk =  <Block> {
            id: "main_grid",
            items: item_list
        };
        this.grid_model.push(blk);
        
        // return blk;
    }

    draw_robot_zone()
    {
        let item_list = [];
        let circle: Circle = 
        {

            center: {x:0,y:0,z:0},
            radius: 210/this.mm_per_px_x,
            style: robot_style,
            type: "Circle"
        }
        item_list.push(circle)
        //-----------------------------------------
        remove_item("robot_zone", this.grid_model);
        let blk =  <Block> {
            id: "robot_zone",
            items: item_list
        };
        this.grid_model.push(blk);
    }

    draw_robot(position: Coordinate, angle: number){
        // console.log("drawing Robot: ");
        
        let item_list = [];
        let circle: Circle = 
        {

            center: position,
            radius: 10+(position.z/10),
            style: robot_style,
            type: "Circle"
        }
        item_list.push(circle)
        
        //---------------------------------------
        //Position of Item in Gripper
        let rect_gripper_item: Rect = 
        {
            center: position,
            width:8,
            height: 12,
            angle: angle,
            style: robot_style,
            type: "Rect"
        }
        item_list.push(rect_gripper_item)
        //---------------------------------------
        //Position of Cam in Gripper
        let cam_pos: Coordinate =
        {
            x: position.x,
            y: position.y,
            z:position.z
        }
        let current_cam_vector = this.rotate_vector(this.cam_vector, angle*Math.PI/180);

        cam_pos.x +=current_cam_vector.dx;
        cam_pos.y +=current_cam_vector.dy;

        let rect_cam: Rect = 
        {
            center: cam_pos,
            width:20,
            height: 20,
            angle: 0,
            style: robot_style,
            type: "Rect"
        }
        item_list.push(rect_cam)

        //---------------------------------------
        //Position of Heater in Gripper
        let heater_pos: Coordinate =
        {
            x: position.x,
            y: position.y,
            z:position.z
        }
        let current_heater_vector = this.rotate_vector(this.heater_vector, angle*Math.PI/180);

        heater_pos.x +=current_heater_vector.dx;
        heater_pos.y +=current_heater_vector.dy;

        let rect_heater: Rect = 
        // export interface Style {
        //     line_color: Color,
        //     line_width?: number,
        //     line_type?: DASH_LINE,
        //     fill_color?: Color,
        //     text_font?: string,   
        //     // ctx.font = "bold italic 50px Arial";
        
        // }
        {
            center: heater_pos,
            width:10,
            height: 10,
            angle: 0,
            style: {
                line_color: "green",
                fill_color: "green",
            },
            type: "Rect"
        }
        item_list.push(rect_heater)

        //-----------------------------------------
        remove_item("robot", this.grid_model);
        let blk =  <Block> {
            id: "robot",
            items: item_list
        };
        this.grid_model.push(blk);
    }
    draw_pickup_area()
    {
        let item_list = [];
        let size_x = data.POSITIONS.PICKUP_AREA.X2-data.POSITIONS.PICKUP_AREA.X1;
        let size_y = data.POSITIONS.PICKUP_AREA.Y2-data.POSITIONS.PICKUP_AREA.Y1;
        let x = data.POSITIONS.PICKUP_AREA.X1 + size_x/2
        let y = data.POSITIONS.PICKUP_AREA.Y1 + size_y/2;
        
        let pickup_center: Coordinate = {
            x: x,
            y: y,
            z: 0
        }
        let rect_pickup: Rect = 
        {
            center: pickup_center,
            width:size_x/this.mm_per_px_x,
            height: size_y/this.mm_per_px_y,
            angle: 0,
            style: {
                line_color: "black",
                fill_color: "white"
            },
            type: "Rect"
        }
        item_list.push(rect_pickup)
        //-----------------------------------------
        remove_item("pickup_area", this.grid_model);
        let blk =  <Block> {
            id: "pickup_area",
            items: item_list
        };
        this.grid_model.push(blk);
    }
    draw_area(tag: string, coord: any, linecolor: string)
    {
        let item_list = [];
        let size_x = coord.X2-coord.X1;
        let size_y = coord.Y2-coord.Y1;
        let x = coord.X1 + size_x/2
        let y = coord.Y1 + size_y/2;
        
        let center: Coordinate = {
            x: x,
            y: y,
            z: 0
        }
        let rect: Rect = 
        {
            center: center,
            width:size_x/this.mm_per_px_x,
            height: size_y/this.mm_per_px_y,
            angle: 0,
            style: {
                line_color: linecolor,
                fill_color: "white"
            },
            type: "Rect"
        }
        item_list.push(rect)
        let text_item: Text = 
        {
            start: center,
            text: tag,
            style: 
            {
                line_color: "black",
                text_font: "Arial 10px"
            },
            type: "Text"
        }
        item_list.push(text_item)
        //-----------------------------------------
        remove_item(tag, this.grid_model);
        let blk =  <Block> {
            id: tag,
            items: item_list
        };
        this.grid_model.push(blk);
    }

    // render(context:CanvasRenderingContext2D, model: any) {
    render(context:CanvasRenderingContext2D) {
        // console.log("rendering data");
        let index = 0;
        
        //could be optimized if required - this recalcs the grid each time 
        
        context.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.draw_area("pickup", data.POSITIONS.PICKUP_AREA, "black");
        this.draw_area("module", data.POSITIONS.MODULE_AREA, "black");
        this.draw_main_grid();
        this.draw_robot_zone();
        
        // console.log(this.grid_model);
        while(index < this.grid_model.length)
        {
          let block = this.grid_model[index]
        //   console.log("drawing: "+block.id);
          let start_px: Coordinate = {x:0, y:0, z:0};
          let end_px: Coordinate = {x:0, y:0, z:0};

          for(const item of block.items)
          {
          
            switch(item.type){
              case "Line":

                let item_line = item as Line;
                // console.log("LINE");
                
                context.strokeStyle =item.style.line_color;
                if(!item.style.line_width) item.style.line_width=1;
                context.lineWidth = item.style.line_width;
                context.beginPath();
                
                start_px = this.mm_to_px(item_line.start);
                context.moveTo(start_px.x, start_px.y);
                end_px = this.mm_to_px(item_line.end);
                context.lineTo(end_px.x, end_px.y);
                context.stroke();
                break;
    
              case "Circle":
                let item_circle = item as Circle
                // console.log("CIRCLE");
                context.strokeStyle =item.style.line_color;
                if(!item.style.line_width)item.style.line_width=1;
                context.lineWidth = item.style.line_width;
                start_px = this.mm_to_px(item_circle.center);
                context.beginPath();
    
                context.arc(start_px.x, start_px.y, item_circle.radius, 0, 2 * Math.PI);
                context.stroke();
                break;
            
              case "Rect":
                // console.log("TEXT");
                let item_rect = item as Rect;
                start_px = this.mm_to_px(item_rect.center);
                let offset_x = start_px.x;
                let offset_y = start_px.y;
                // console.log("x:"+start_px.x)
                // console.log("y:"+start_px.y)
                context.translate(offset_x, offset_y);
                context.rotate(-item_rect.angle*Math.PI/180);
                context.beginPath();
                context.rect(-item_rect.width/2, -item_rect.height/2, item_rect.width, item_rect.height);
                if(!item_rect.style.fill_color) item_rect.style.fill_color = item_rect.style.line_color;
                context.fillStyle = item_rect.style.fill_color;
                context.fill();
                if(!item_rect.style.line_width) item_rect.style.line_width = 1;
                context.lineWidth = item_rect.style.line_width;
                context.strokeStyle = item_rect.style.line_color;
                context.stroke();

                context.rotate(item_rect.angle*Math.PI/180);
                context.translate(-offset_x, -offset_y);
                
                break;
            
              case "Text":
                // console.log("TEXT");
                let item_text = item as Text;

                start_px = this.mm_to_px(item_text.start);
                if(!item_text.style.text_font) item_text.style.text_font = "";
                context.font = item_text.style.text_font;
                if(!item_text.style.fill_color) item_text.style.fill_color = item_text.style.line_color;
                context.fillStyle = item_text.style.fill_color
                context.fillText(item_text.text, start_px.x, start_px.y);
                
                break;
            }
          }
          index += 1
        }
    
    
      }

}



export function remove_item(item_to_remove: String, model: Array<Block>): Array<Block>
{
    let index = 0;
    while(index < model.length)
    {
        
        let block = model[index];
        // console.log("checking item: "+block.id)
        if( block.id == item_to_remove) 
        {
            // console.log("removing item: "+item_to_remove)
            // console.log(model);
            model.splice(index,1);
            // console.log(model);
        }
        else{
            index += 1;
        }
    }
    return model;
}

