import Geometry,{Intersection} from "../../utils/geometry";
import Shape from "./Shape";
import DistancePicker from "./pickers/DistancePicker";

export default class SLineShape extends Shape{
    constructor(line){
        super();
        this.model=line;
        this.properties=[
            {type:Shape.PropertyTypes.STRING,value:'SLine'},
            {type:Shape.PropertyTypes.NUMBER,value:line.a,picker:DistancePicker,regexp:Shape.RegExp.NUMBER},
            {type:Shape.PropertyTypes.NUMBER,value:line.b,picker:DistancePicker,regexp:Shape.RegExp.NUMBER},
            {type:Shape.PropertyTypes.NUMBER,value:line.c,picker:DistancePicker,regexp:Shape.RegExp.NUMBER}
        ]
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        if(this.p0===null||this.p1===null)return;
        ctx.beginPath();
        ctx.moveTo(this.p0.x+0.5,this.p0.y+0.5);
        ctx.lineTo(this.p1.x+0.5,this.p1.y+0.5);
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        let center={x:realRect.topLeft.x+realRect.width/2,y:realRect.topLeft.y-realRect.height/2};
        let radius=Geometry.distance(realRect.topLeft,center);
        let p=Intersection.CircleSLine({center,radius},this.model);
        if(p!==null){
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

    move(distance){
        //super.move(distance);
        this.model=Geometry.LineShifted(this.model,distance.x,distance.y);
        this.properties[1].value=this.model.a;
        this.properties[2].value=this.model.b;
        this.properties[3].value=this.model.c;
     }
     
    refreshModel(){
        this.model.a=this.properties[1].value;
        this.model.b=this.properties[2].value;
        this.model.c=this.properties[3].value;
        
     }
    getDistance(point){
        return Geometry.PointToSLineDistance(point,this.model);
    }
    isInRect(topLeft,bottomRight){
        const full=false;
        const cross=Intersection.RectangleSLine(topLeft,bottomRight,this.model).length>0;
        return {cross,full};    
    }
    toString(){
        return `Straight Line ${this.model.a}X+${this.model.b}Y+${this.model.c}=0`;
    }
}