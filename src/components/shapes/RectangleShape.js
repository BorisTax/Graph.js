import Geometry,{Rectangle,Coord2D,Line, Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import PointMarker from './markers/PointMarker';
import PointPicker from './pickers/PointPicker';

export default class RectangleShape extends Shape{
    constructor(model){
        super();
        this.model=model;
        this.rect=new Rectangle()
        this.properties=[
            {type:Shape.PropertyTypes.STRING,value:'Rectangle'},
            {type:Shape.PropertyTypes.VERTEX,value:model.topLeft,show:false,selected:false,picker:PointPicker,regexp:Shape.RegExp.NUMBER},
            {type:Shape.PropertyTypes.VERTEX,value:model.bottomRight,show:false,selected:false,picker:PointPicker,regexp:Shape.RegExp.NUMBER},
        ]
        for(let p of this.properties)
          if(p.type===Shape.PropertyTypes.VERTEX) p.marker=new PointMarker(p.value,false)
    }

    drawSelf(ctx, realRect, screenRect) {
        super.drawSelf(ctx,realRect, screenRect)
        ctx.strokeRect(this.rect.topLeft.x,this.rect.topLeft.y,this.rect.width,this.rect.height);
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
}