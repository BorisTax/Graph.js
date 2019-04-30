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
    toString(){
        return "Rectangle";
    }
}