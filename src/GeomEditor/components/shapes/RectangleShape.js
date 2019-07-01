import Geometry,{Rectangle,Coord2D} from '../../utils/geometry';
import EndSnapMarker from './snapmarkers/EndSnapMarker';
import MiddleSnapMarker from './snapmarkers/MiddleSnapMarker';
import AbstractShape from "./AbstractShape";

export default class RectangleShape extends AbstractShape{
    constructor(rectangle){
        super();
        this.rectangle=rectangle;
        this.rect=new Rectangle()
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
    }
    getModel(){
        return this.rectangle;
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
    getProperties(){
        let prop=new Map();
        prop.set('Title','Rectangle');
        prop.set('X1',this.rectangle.topLeft.x);
        prop.set('Y1',this.rectangle.topLeft.y);
        prop.set('X2',this.rectangle.bottomRight.x);
        prop.set('Y2',this.rectangle.bottomRight.y);
        return prop;
    }
    setProperties(prop){
        super.setProperties(prop);
        let x1=prop.get('X1');
        let y1=prop.get('Y1');
        let x2=prop.get('X2');
        let y2=prop.get('Y2');
        if (x1) this.rectangle.topLeft.x=x1;
        if (y1) this.rectangle.topLeft.y=y1;
        if (x2) this.rectangle.bottomRight.x=x2;
        if (y2) this.rectangle.bottomRight.y=y2;
        this.rectangle.width=this.rectangle.bottomRight.x-this.rectangle.topLeft.x;
        this.rectangle.height=this.rectangle.topLeft.y-this.rectangle.bottomRight.y;
    }
    toString(){
        return "Rectangle";
    }
}