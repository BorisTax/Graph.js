import PointMarker from "../markers/PointMarker";

export default class ShapeBuilder {
     constructor(screenOuterCircle){
        this.i=0;
        this.screenOuterCircle=screenOuterCircle;
        this.legal=true;
        this.helperShapes=[];
    }

    getShape(){
        return this.shape;
    }
    getHelperShapes(){
        return this.helperShapes;
    }
    isNext(){
        return (this.i<this.points.length);
    }
    setNextPoint(p){
        this.helperShapes.push(new PointMarker(this.points[this.i]));
        this.setCurrent(p);
        this.i++;
    }

    isLegal(){return this.legal}
    refresh(screenOuterCircle){
        this.screenOuterCircle=screenOuterCircle;
    }
    setStyle(style){
        this.style=style;
    }
    getCurrentStep(){
        return this.i;
    }
    getName(){
        return this.name;
    }
}