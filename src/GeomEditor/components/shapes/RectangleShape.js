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
        prop.set('Title',{value:'Rectangle',regexp:/\s*/});
        prop.set('X1',{value:this.rectangle.topLeft.x,regexp:/^-?\d+\.?\d*$/});
        prop.set('Y1',{value:this.rectangle.topLeft.y,regexp:/^-?\d+\.?\d*$/});
        prop.set('X2',{value:this.rectangle.bottomRight.x,regexp:/^-?\d+\.?\d*$/});
        prop.set('Y2',{value:this.rectangle.bottomRight.y,regexp:/^-?\d+\.?\d*$/});
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
        switch(prop.key){
            case 'X1':
                this.rectangle.topLeft.x=prop.value;
                break;
            case 'Y1':
                this.rectangle.topLeft.y=prop.value;
                break;
            case 'X2':
                this.rectangle.bottomRight.x=prop.value;
                break;
            case 'Y2':
                this.rectangle.bottomRight.y=prop.value;
                break;
            default:
        }
        this.rectangle.width=this.rectangle.bottomRight.x-this.rectangle.topLeft.x;
        this.rectangle.height=this.rectangle.topLeft.y-this.rectangle.bottomRight.y;
    }
    toString(){
        return "Rectangle";
    }
}