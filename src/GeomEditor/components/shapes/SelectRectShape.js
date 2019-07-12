import Geometry,{Rectangle,Coord2D} from '../../utils/geometry';
import {Color} from '../colors';
import AbstractShape from "./AbstractShape";
import ShapeStyle from './ShapeStyle';

export default class SelectRectShape extends AbstractShape{
    constructor(rectangle){
        super();
        this.rectangle=rectangle;
        this.rect=new Rectangle()
        this.setStyle(new ShapeStyle(Color.SELECTION_AREA,ShapeStyle.SELECTION));
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
        return list;
    }
    getProperties(){
        let prop=new Map();
        return prop;
    }
    setProperty(prop){
        super.setProperty(prop);
    }
    toString(){
        return "RectSelection";
    }
}