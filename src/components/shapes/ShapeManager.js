export default class ShapeManager {
    constructor(shapes){
        this.allShapes=shapes;
    }
    setShapes(shapes,selType){
        this.allShapes=shapes;
        this.selType=selType;
    }
    setShapeNearPoint(p, dist){
        let shape=null;
        this.allShapes.forEach(s=>{
            let d=s.getDistance(p);
            if(d!==null&&d<=dist) {shape=s;}
            s.setState({highlighted:false});
        });
        if(shape!==null)shape.setState({highlighted:true});
    }
    setShapeInRect(p1,p2){
        let tl={...p1};
        let br={...p2};
        if(p1.x>p2.x) {tl.x=p2.x;br.x=p1.x}
        if(p1.y<p2.y) {tl.y=p2.y;br.y=p1.y}
        let shape=[];
        this.allShapes.forEach(s=>{
            if(!s.isInRect)return;//if method isInRect isn't implemented
            const {cross,full}=s.isInRect(tl,br);
            let ok=false;
            if(this.selType==='fullSelect'&&full===true) ok=true;
            if(this.selType==='crossSelect'&&cross===true) ok=true;
            if(this.selType==='crossSelect'&&full===true) ok=true;
            if(ok) {shape.push(s);}
            s.setState({highlighted:false});
        });
        if(shape.length!==0)shape.forEach(s=>{s.setState({highlighted:true})});
    }
    toggleShapeSelected(){
        this.allShapes.forEach(shape => {
            if(shape.getState().highlighted) shape.setState({selected:!shape.getState().selected});
        }); 
    }
    getSelectedShapes(){
        return this.allShapes.filter((shape)=>shape.getState().selected===true);
    }
}