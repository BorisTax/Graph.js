import Geometry,{Rectangle,Coord2D,Line, Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointPicker from './pickers/PointPicker';
import {PropertyTypes} from "./PropertyData";
export default class RectangleShape extends Shape{
    constructor(model){
        super();
        this.model=model;
        this.rect=new Rectangle()
        this.properties=[
            {type:PropertyTypes.STRING,labelKey:"name"},
            {type:PropertyTypes.VERTEX,value:model.topLeft,labelKey:"p1",picker:PointPicker},
            {type:PropertyTypes.VERTEX,value:model.bottomRight,labelKey:"p2",picker:PointPicker},
        ]
        this.defineProperties();
    }

    drawSelf(ctx, realRect, screenRect) {
        super.drawSelf(ctx,realRect, screenRect)
        ctx.strokeRect(this.rect.topLeft.x+0.5,this.rect.topLeft.y+0.5,this.rect.width+0.5,this.rect.height+0.5);
    }
    refresh(realRect, screenRect){
        this.rect.topLeft=Geometry.realToScreen(this.model.topLeft,realRect,screenRect);
        this.rect.width=Geometry.realToScreenLength(this.model.width,realRect.width,screenRect.width);
        this.rect.height=Geometry.realToScreenLength(this.model.height,realRect.height,screenRect.height);
        // if(this.activePoint) 
        //     this.activePointMarker=new PointMarker(this.activePoint)
    }
    getMarkers(){
        let list=[];
        list.push(new EndSnapMarker(this.model.topLeft));
        list.push(new EndSnapMarker(new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y)));
        list.push(new EndSnapMarker(new Coord2D(this.model.topLeft.x,this.model.topLeft.y-this.model.height)));
        list.push(new EndSnapMarker(new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y-this.model.height)));
        list.push(new MiddleSnapMarker(Geometry.midPoint(this.model.topLeft,new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y),new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y-this.model.height))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.model.topLeft.x+this.model.width,this.model.topLeft.y-this.model.height),new Coord2D(this.model.topLeft.x,this.model.topLeft.y-this.model.height))));
        list.push(new MiddleSnapMarker(Geometry.midPoint(new Coord2D(this.model.topLeft.x,this.model.topLeft.y-this.model.height),this.model.topLeft)));
        return list;
    }

    refreshModel(){
        this.model.topLeft=this.properties[1].value;
        this.model.bottomRight=this.properties[2].value;
        this.model.width=this.model.bottomRight.x-this.model.topLeft.x;
        this.model.height=this.model.topLeft.y-this.model.bottomRight.y;
    }
    getDistance(point) {
        let tl=this.model.topLeft;
        let tr=new Coord2D(tl.x+this.model.width,tl.y);
        let bl=new Coord2D(tl.x,tl.y-this.model.height);
        let br=new Coord2D(tl.x+this.model.width,tl.y-this.model.height);
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
        const inRect=[Geometry.pointInRect(this.model.topLeft,topLeft,bottomRight),
                        Geometry.pointInRect(this.model.bottomRight,topLeft,bottomRight)];
        const full=inRect.every(i=>i===true);
        const cross=Intersection.RectangleRectangle(topLeft,bottomRight,this.model.topLeft,this.model.bottomRight).length>0;
        return {cross,full};    
    }
    toString(){
        return "Rectangle";
    }
    getDescription(){
        return 'Rectangle';
    }
}