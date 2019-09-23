export default class AbstractCreator {
     constructor(boundedCircle){
        this.i=0;
        this.boundedCircle=boundedCircle;
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
        this.setCurrent(p);
        this.i++;
    }

    refresh(boundedCircle){
        this.boundedCircle=boundedCircle;
        if(this.points[this.i]!=null) this.setControlPoints();
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