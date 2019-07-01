export default class ShapeManager {
    constructor(shapes){
        this.allShapes=shapes;
    }
    setShapeNearPoint(p, dist){
        let shape=null;
        this.allShapes.forEach((s,index)=>{
            if(index<=1) return;
            let d=s.getModel().getDistance(p);
            if(d<=dist) {shape=s;}
            s.setState({highlighted:false});
        });
        if(shape!==null)shape.setState({highlighted:true});
    }
    toggleShapeSelected(){
        this.allShapes.forEach((shape,index) => {
            if(index<=1) return;
            if(shape.getState().highlighted) shape.setState({selected:!shape.getState().selected});
        }); 
    }
    getSelectedShapes(){
        return this.allShapes.filter((shape)=>shape.getState().selected===true);
    }
}