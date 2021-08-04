import Geometry, { Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import {PropertyTypes} from "./PropertyData";
import PointPicker from './pickers/PointPicker';
const functions=['sin','cos','tan','asin','acos','atan','log','exp','pow','abs'];

function replaceMath(str){
    let s=str
    for(let func of functions){
        s=s.replace(RegExp(func,"g"),`Math.${func}`)
    }
    return s;
}
function test(str){

    const operators=[...functions,'\\d','\\(','\\)','\\+','\\-',',','\\.','\\*','\\/','x']
    let s=str.toLowerCase()
    if (s.match('xx')) return false;
    for(let op of operators){
        s=s.replace(RegExp(op,"g"),"")
    }
    if (s!="") return false
    let x=1;
    s=str.toLowerCase()
    for(let func of functions){
        s=s.replace(RegExp(func,"g"),`Math.${func}`)
    }
    try{
        eval(s)
    }
    catch(e){
        return false
    }
    return true
}

export default class FunctionShape extends Shape{
    constructor({func="pow(x,3)"}){
        super();
        this.model={func,mathFunc:replaceMath(func)};
        this.properties=[
            {type:PropertyTypes.STRING,labelKey:"name"},
            {type:PropertyTypes.INPUT,value:func,labelKey:"func",test},
        ]
        this.defineProperties();
    }
    drawSelf(ctx,realRect, screenRect){
        super.drawSelf(ctx,realRect, screenRect)
        ctx.beginPath();
        let first=true;
        let dw=realRect.width/screenRect.width
        let dh=realRect.height/screenRect.height
        for(let vx=0;vx<=screenRect.width;vx+=1){
        let x=realRect.topLeft.x+dw*vx
        let ry=eval(this.model.mathFunc);
        if(ry==='Infinity'){ry=realRect.topLeft.y;}
        if(ry==='-Infinity'){ry=realRect.bottomRight.y;}
        let vy=(realRect.topLeft.y-ry)/dh
        
        if ((vy>=0&&vy<=screenRect.height)){
            if (first) {ctx.moveTo(vx+0.5,vy+0.5);}
            if (!first) ctx.lineTo(vx+0.5,vy+0.5);
            first=false;
            }
            else first=true;
        }
        
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.screenRect=screenRect
        this.realRect=realRect

    }
    getMarkers(){
        let list=[];
        //list.push(new EndSnapMarker(this.properties[1].value));
        //list.push(new EndSnapMarker(this.properties[2].value));
        //list.push(new MiddleSnapMarker(Geometry.midPoint(this.properties[1].value,this.properties[2].value)))
        return list;
    }

    refreshModel(){
        this.model.func=this.properties[1].value;
        this.model.mathFunc=replaceMath(this.model.func);
        //this.model.p1=this.properties[1].value;
        //this.model.p2=this.properties[2].value;
     }

    getDistance(point) {
        let min=1000000;
        let dw=this.realRect.width/this.screenRect.width
        for(let vx=0;vx<=this.screenRect.width;vx+=1){
            let x=this.realRect.topLeft.x+dw*vx
            let ry=eval(this.model.mathFunc);
            let y=eval(this.model.mathFunc);
            let d=Math.sqrt((x-point.x)*(x-point.x) +(y-point.y)*(y-point.y))
            if (min>d) min=d;
        }

        return min
        //return Geometry.PointToLineDistance(point,{p1:this.model.p1,p2:this.model.p2});
    }

    isInRect(topLeft,bottomRight){
        //const inRect=[Geometry.pointInRect(this.model.p1,topLeft,bottomRight),
                        //Geometry.pointInRect(this.model.p2,topLeft,bottomRight)];
        //const full=inRect.every(i=>i===true);
        //const cross=Intersection.LineRectangle({p1:this.model.p1,p2:this.model.p2},topLeft,bottomRight).length>0;
        let cross=true
        let full=true
        return {cross,full};    
    }
    toString(){
            return `Function y=${this.model}`;
    }
    getDescription(){
        return 'Function';
    }

}