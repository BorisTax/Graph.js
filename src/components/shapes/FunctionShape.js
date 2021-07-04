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
    constructor({func="x"}){
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
        let p0;
        let p
        for(let x=realRect.topLeft.x;x<=realRect.bottomRight.x;x+=this.step/2){
        let y=eval(this.model.mathFunc);
        if(y=='Infinity'){y=realRect.topLeft.y;}
        if(y=='-Infinity'){y=realRect.bottomRight.y;}
        if (!isNaN(y)){
            p=Geometry.realToScreen({x,y},realRect,screenRect);
            if (first) {p0=p;}
            ctx.moveTo(p0.x+0.5,p0.y+0.5);
            if (!first) ctx.lineTo(p.x+0.5,p.y+0.5);
            first=false;
            }
            p0=p;
        }
        
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        this.step=realRect.width/screenRect.width
        this.model.mathFunc=replaceMath(this.model.func);
        //this.p0 = Geometry.realToScreen(this.properties[1].value,realRect,screenRect);
        //this.p1 = Geometry.realToScreen(this.properties[2].value, realRect, screenRect);

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
        let x=point.x
        let y=eval(this.model.mathFunc)
        return Math.abs(point.y-y)
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