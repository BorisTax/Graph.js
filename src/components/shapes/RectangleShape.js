import Geometry,{Rectangle,Coord2D,Line, Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointMarker from './markers/PointMarker';
import PointPicker from './pickers/PointPicker';

export default class RectangleShape extends Shape{
    constructor(rectangle){
        super();
        this.rectangle=rectangle;
        this.model=rectangle;
        this.rect=new Rectangle()
        this.controlPoints=[
            {point:this.rectangle.topLeft,show:false,selected:false},
            {point:this.rectangle.bottomRight,show:false,selected:false}]
        for(let cp of this.controlPoints)
          cp.marker=new PointMarker(cp.point,false)
    }

    drawSelf(ctx, realRect, screenRect) {
        this.refresh(realRect, screenRect);
        ctx.strokeStyle=this.getStyle().getColor();
        ctx.setLineDash(this.getStyle().getStroke());
        ctx.lineWidth=this.getStyle().getWidth();
        ctx.strokeRect(this.rect.topLeft.x,this.rect.topLeft.y,this.rect.width,this.rect.height);
    }
    refresh(realRect, screenRect){
        this.rect.topLeft=Geometry.realToScreen(this.rectangle.topLeft,realRect,screenRect);
        this.rect.width=Geometry.realToScreenLength(this.rectangle.width,realRect.width,screenRect.width);
        this.rect.height=Geometry.realToScreenLength(this.rectangle.height,realRect.height,screenRect.height);
        if(this.activePoint) 
            this.activePointMarker=new PointMarker(this.activePoint)
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.rectangle.topLeft));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y)));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x,this.rectangle.topLeft.y-this.rectangle.height)));
        list.push(new EndSnapMarker(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y-this.rectangle.height)));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.rectangle.topLeft,new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y),new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y-this.rectangle.height))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.rectangle.topLeft.x+this.rectangle.width,this.rectangle.topLeft.y-this.rectangle.height),new Coord2D(this.rectangle.topLeft.x,this.rectangle.topLeft.y-this.rectangle.height))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.rectangle.topLeft.x,this.rectangle.topLeft.y-this.rectangle.height),this.rectangle.topLeft)));
        return list;
    }
    setActivePoint(key){
        super.setActivePoint()
        if(key==='P1') {this.controlPoints[0].selected=true;this.controlPoints[0].marker.setActive(true)}
        if(key==='P2') {this.controlPoints[1].selected=true;this.controlPoints[1].marker.setActive(true)}
    }
    getProperties(){
        let prop=new Map();
        prop.set('Title',{value:'Rectangle',regexp:/\s*/});
        prop.set('P1',{value:{x:this.rectangle.topLeft.x,y:this.rectangle.topLeft.y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        prop.set('P2',{value:{x:this.rectangle.bottomRight.x,y:this.rectangle.bottomRight.y},picker:PointPicker,regexp:/^-?\d*\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'P1':
                this.rectangle.topLeft.x=prop.value.x;
                this.rectangle.topLeft.y=prop.value.y;
                this.controlPoints[0].point=this.rectangle.topLeft;
                break;
            case 'P2':
                this.rectangle.bottomRight.x=prop.value.x;
                this.rectangle.bottomRight.y=prop.value.y;
                this.controlPoints[1].point=this.rectangle.bottomRight;
                break;
            default:
        }
        this.rectangle.width=this.rectangle.bottomRight.x-this.rectangle.topLeft.x;
        this.rectangle.height=this.rectangle.topLeft.y-this.rectangle.bottomRight.y;
    }
    getDistance(point) {
        let tl=this.rectangle.topLeft;
        let tr=new Coord2D(tl.x+this.rectangle.width,tl.y);
        let bl=new Coord2D(tl.x,tl.y-this.rectangle.height);
        let br=new Coord2D(tl.x+this.rectangle.width,tl.y-this.rectangle.height);
        let top=new Line(tl,tr);
        let bottom=new Line(bl,br);
        let right=new Line(tr,br);
        let left=new Line(tl,bl);
        return Math.min(Geometry.PointToLineDistance(point,top),
        Geometry.PointToLineDistance(point,left),
        Geometry.PointToLineDistance(point,bottom),
        Geometry.PointToLineDistance(point,right));
    }
    isInRect(topLeft,bottomRight){
        const inRect=[Geometry.pointInRect(this.rectangle.topLeft,topLeft,bottomRight),
                        Geometry.pointInRect(this.rectangle.bottomRight,topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const cross=Intersection.RectangleRectangle(topLeft,bottomRight,this.rectangle.topLeft,this.rectangle.bottomRight).length>0;
        return {cross,full};    
    }
    toString(){
        return "Rectangle";
    }
}