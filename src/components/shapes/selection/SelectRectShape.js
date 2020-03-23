import Geometry,{Rectangle} from '../../../utils/geometry';
import {Color} from '../../colors';
import Shape from "../Shape";
import ShapeStyle from '../ShapeStyle';

export default class SelectRectShape extends Shape{
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
        ctx.strokeRect(this.rect.topLeft.x+0.5,this.rect.topLeft.y+0.5,this.rect.width,this.rect.height);
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