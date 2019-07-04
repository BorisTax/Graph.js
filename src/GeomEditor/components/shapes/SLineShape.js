import Geometry,{Circle,Coord2D} from "../../utils/geometry";
import AbstractShape from "./AbstractShape";

export default class SLineShape extends AbstractShape{
    constructor(line){
        super();
        this.line=line;
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
    getModel(){
        return this.line;
    }
    getMarkers(){
        return null;
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title','Straight line Ax+By+C=0');
        prop.set('A',this.line.a);
        prop.set('B',this.line.b);
        prop.set('C',this.line.c);
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
    toString(){
        return `Line ${this.line.a}X+${this.line.b}Y+${this.line.c}=0`;
    }
}