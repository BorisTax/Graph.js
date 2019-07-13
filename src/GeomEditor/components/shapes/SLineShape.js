import Geometry,{Circle,Coord2D} from "../../utils/geometry";
import Shape from "./Shape";

export default class SLineShape extends Shape{
    constructor(line){
        super();
        this.line=line;
        this.model=line;
    }
    drawSelf(ctx,realRect, screenRect){
        this.refresh(realRect, screenRect);
        if(this.p0===null||this.p1===null)return;
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.beginPath();
        ctx.moveTo(this.p0.x,this.p0.y);
        ctx.lineTo(this.p1.x,this.p1.y);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        let br=new Coord2D(realRect.topLeft.x+realRect.width,realRect.topLeft.y-realRect.height);
        let c=Geometry.midPoint(realRect.topLeft,br);
        let rad=Geometry.distance(realRect.topLeft,br)/2;
        let circle=new Circle(c,rad);
        let p=Geometry.CircleLineIntersection(this.line,circle);
        if(p!=null){
            if(p.length===1){
                let r=this.p[0];
                p=new Array(2);
                p[0]=r;
                p[1]=p[0];
                }
            this.p0=Geometry.realToScreen(p[0],realRect,screenRect);
            this.p1=Geometry.realToScreen(p[1],realRect,screenRect);
        }else{
            this.p0=null;
            this.p1=null;
        }
    }

    getMarkers(){
        return null;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Straight line Ax+By+C=0',regexp:/\s*/});
        prop.set('A',{value:this.line.a,regexp:/^-?\d+\.?\d*$/});
        prop.set('B',{value:this.line.b,regexp:/^-?\d+\.?\d*$/});
        prop.set('C',{value:this.line.c,regexp:/^-?\d+\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'A':
                if(!(this.line.b==0&&prop.value==0)) this.line.a=prop.value;
                break;
            case 'B':
                if(!(this.line.a==0&&prop.value==0)) this.line.b=prop.value;
                break;
            case 'C':
                this.line.c=prop.value;
                break;
            default:
        }
    }
    getDistance(point) {
        return Geometry.PointToSLineDistance(point,this.line);
    }
    toString(){
        return `Line ${this.line.a}X+${this.line.b}Y+${this.line.c}=0`;
    }
}