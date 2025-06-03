import { coordinate, init_coordinate } from "./action-interface"

export interface ItemInterface {
    type: String,
    description: String,
    items: [DetectionItem]
}

export interface DetectionItem {
    id: number,
    position: coordinate
    info: String
}

export function init_DetectionItem(): DetectionItem {
    let pcb: DetectionItem= {
        id : -1,
        position : init_coordinate(),
        info : ""

    }
    return pcb
}
export function init_ItemInterface(): ItemInterface {
    let item = init_DetectionItem()
    let items: ItemInterface= {
        type: "generic",
        items:[item],
        description : ""

    }
    return items
}



