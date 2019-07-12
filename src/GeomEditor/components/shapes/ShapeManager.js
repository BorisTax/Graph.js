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
    setShapeInRect(p1,p2){
        let tl=p1;
        let br=p2;
        if(p1.x>p2.x) {tl.x=p2.x;br.x=p1.x}
        if(p1.y<p2.y) {tl.y=p2.y;br.y=p1.y}
        let shape=null;
        this.allShapes.forEach((s,index)=>{
            if(index<=1) return;
            if(!s.getModel().isInRect)return;
            const {cross,full}=s.getModel().isInRect(tl,br);
            if(cross==true) {shape=s;}
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