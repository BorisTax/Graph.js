import Shape from "../Shape";

export default class SelectionManager {
    constructor(shapes){
        this.allShapes=shapes;
        this.selectedShapes=0;
    }
    setShapes(shapes,selType){
        this.allShapes=shapes;
        this.selType=selType;
    }
    findShapeNearPoint(p, dist, altKey){
        let shape=null;
        this.allShapes.forEach(s=>{
            let d=s.getDistance(p);
            if(d!==null&&d<=dist) {shape=s;} else s.setState({underCursor:false,highlighted:s.getState().inSelection});;
        });
        if(shape!==null){
           if(!altKey)shape.setState({underCursor:true,highlighted:true});

        }
    }
    findControlPoints(p, dist){
        for(const shape of this.allShapes){
            if(shape.getState().selected){
                const distances=shape.getDistanceToControlPoints?shape.getDistanceToControlPoints(p):[];
                let i=0;
                for(const d of distances){
                    if(d!==null&&d<=dist) {shape.properties[i].underCursor=true}
                        else {shape.properties[i].underCursor=false}
                    i++;
                }
            }
        }
    }
    selectControlPoints(shiftKey,altKey){
        for(const shape of this.allShapes){
            if(shape.getState().selected){
                let selPoints=0;
                for(const cp of shape.properties){
                    if(cp.type!==Shape.PropertyTypes.VERTEX) continue;
                    if(!shiftKey&&!altKey) cp.selected=false;
                    if(cp.underCursor) {cp.selected=!altKey}
                    if(cp.selected) selPoints++;
                }
                shape.setState({selectedPoints:selPoints})
            }
        }
    }
    findShapeInRect(p1,p2,shiftKey,altKey){
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
            if(ok) {
                shape.push(s);
            }else
            if(!shiftKey)s.setState({inSelection:false});
        });
        shape.forEach(s=>{s.setState({inSelection:true,highlighted:true})});
    }
    selectShapes({shiftKey,altKey}){
        if(!shiftKey&&!altKey)this.deselectShapes();
        this.allShapes.forEach(shape => {
            if(shape.getState().inSelection||shape.getState().underCursor) {
               if(altKey&&shape.getState().selectedPoints===0)shape.setState({selected:false,inSelection:false,highlighted:false});
               else {
                   shape.setState({selected:true,inSelection:false,highlighted:false});
                   this.selectedShapes++;
                   
                }
            }
        }); 
    }
    deselectShapes(){
        this.allShapes.forEach(shape => shape.setState({selected:false}));
        this.selectedShapes=0;
    }
    getSelectedShapes(){
        return this.allShapes.filter((shape)=>shape.getState().selected===true);
    }
}