export default class ShapeManager {
    constructor(shapes){
        this.allShapes=shapes;
    }
    setShapeNearPoint(p, dist){
        let shape=null;
        for(let s of this.allShapes){
            let d=s.getModel().getDistance(p);
            if(d<=dist) {shape=s;}
            s.setSelected(false);
        }
        if(shape!==null)shape.setSelected(true);
    }
}