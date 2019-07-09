import SelectRectShape from "./SelectRectShape";
import { Rectangle } from "../../utils/geometry";

export default class SelectionManager {
    constructor(creator){
        this.selectionCreator=new creator();
    }
    setNext(point){
        this.selectionCreator.setNextPoint(point);
    }
    setCurrent(point){
        this.selectionCreator.setCurrent(point);
    }
    getSelectionShape(){
        return this.selectionCreator.getShape();
    }
}