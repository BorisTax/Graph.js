import Geometry, { Intersection} from '../../utils/geometry';
import EndSnapMarker from './markers/EndSnapMarker';
import MiddleSnapMarker from './markers/MiddleSnapMarker';
import Shape from "./Shape";
import {PropertyTypes} from "./PropertyData";
import PointPicker from './pickers/PointPicker';
const functions=['sqrt','sin','cos','tan','asin','acos','atan','log','exp','pow','abs'];

function replaceMath(str){
    let s=str
    for(let func of functions){
        s=s.replace(RegExp(func,"g"),`Math.${func}`)
    }
    return s;
}
function test(str){

    const operators=[...functions,'\\d','\\(','\\)','\\+','\\-',',','\\.','\\*','\\/','a']
    let s=str.toLowerCase()
    if (s.match('aa')) return false;
    for(let op of operators){
        s=s.replace(RegExp(op,"g"),"")
    }
    if (s!="") return false
    let a=1;
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

export default class FunctionPolarShape extends Shape{
    constructor({func="a"}){
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
        const p={x:0,y:0}
        for(let a=0;a<=Math.PI*2;a+=Math.PI/180){
        //let a=realRect.topLeft.x+dw*vx
        let r = eval(this.model.mathFunc);
        p.x=r*Math.cos(a)
        p.y=r*Math.sin(a)
        //if(ry==='Infinity'){ry=realRect.topLeft.y;}
        //if(ry==='-Infinity'){ry=realRect.bottomRight.y;}
        let {x,y}=Geometry.realToScreen(p,realRect,screenRect);
        //if ((vy>=0&&vy<=screenRect.height)){
            if (first) {ctx.moveTo(x+0.5,y+0.5);}
            if (!first) ctx.lineTo(x+0.5,y+0.5);
            first=false;
            }
           // else first=true;
        //}
        ctx.stroke();
    }
    refresh(realRect, screenRect){
        

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
        let min=100000000
        const p={x:0,y:0}
        for(let a=0;a<=Math.PI*2;a+=Math.PI/180){
            //let a=realRect.topLeft.x+dw*vx
            let r = eval(this.model.mathFunc);
            p.x=r*Math.cos(a)
            p.y=r*Math.sin(a)
            let d=Math.sqrt((p.x-point.x)*(p.x-point.x) +(p.y-point.y)*(p.y-point.y))
            if (min>d) min=d;
        }
        return min;
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
            return `Function p=${this.model}`;
    }
    getDescription(){
        return 'FunctionPolar';
    }

}