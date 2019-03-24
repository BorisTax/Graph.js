import React from 'react';
import Geometry, {StraightLine, Line, Circle, Coord2D, Point2D, StraightHalfLine} from '../util/geometry/geometry.js';
import StraightLineShape from "./shapes/StraightLineShape.js";
class Screen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            status:'FREE',
            points:new Array(3),
            topLeft:new Coord2D(),
            bottomRight:new Coord2D(),
            boundedCircle:new Circle(0,0),
            shapes:[],
            curShape:null,
            shapeCreator:null,
            realWidth:0,realHeight:0,
            ratio:1,
            pixelRatio:1,
            marginTop:15,marginLeft:80,marginBottom:15,marginRight:10,
            screenWidth:550,screenHeight:550,
            statusBar:5,
            xAxe:null,yAxe:null,
            curPoint:new Point2D(),
            prevPoint:new Point2D(),
            curCoord:new Coord2D(),
            snap:false,
            gridStep:1,gridStepPixels:1,dragGrid:false,showGrid:true,
            gridPointsX:[],gridPointsY:[],
            gridNumbersX:[],gridNumbersY:[],
            dragX0:0,dragY0:0,
            creationStep:"",currentShape:"",
            curColor:"",
            drag:false,lbut:0o00,mbut:0o01,
        }
    }
    setBoundedCircle(state){
        let c=this.screenToReal(state.screenWidth/2,state.screenHeight/2,state);
        let r=Math.sqrt(state.realWidth*state.realWidth+state.realHeight*state.realHeight)/2;
        state.boundedCircle=new Circle(c,r);
    }
    screenToReal(x,y,state){
        let rx=x/state.screenWidth*state.realWidth+state.topLeft.x;
        let ry=state.topLeft.y-y/state.screenHeight*state.realHeight;
        return new Coord2D(rx,ry);
    }
    realToScreen(p,state){
        let x=Math.round((p.x-state.topLeft.x)/state.pixelRatio);
        let y=-Math.round((p.y-state.topLeft.y)/state.pixelRatio);
        return new Point2D(x,y);
    }
    setTopLeft(p,state){
        state.topLeft=p;
        state.bottomRight={};
        state.bottomRight.x=state.topLeft.x+state.realWidth;
        state.bottomRight.y=state.topLeft.y-state.realHeight;
    }
    setRealWidth(width,state){
       //debugger;
       state.realWidth=width;
       state.realHeight=width/state.ratio;
       state.pixelRatio=state.realWidth/state.screenWidth;
       state.gridStepPixels=Math.round(state.gridStep/state.pixelRatio);
       state.bottomRight={};
       state.bottomRight.x=state.topLeft.x+state.realWidth;
       state.bottomRight.y=state.topLeft.y+state.realHeight;
    }
    setScale(scale,anchor,state){
        let dx=anchor.x-state.topLeft.x;
        let dy=anchor.y-state.topLeft.y;
        this.setRealWidth(state.realWidth*scale,state);
        dx=dx*scale;
        dy=dy*scale;
        this.setTopLeft(new Coord2D(anchor.x-dx,anchor.y-dy),state);
        this.setBoundedCircle(state);
        if(state.gridStep/state.pixelRatio<10){
            if (state.gridStep<1000000) state.gridStep=state.gridStep*10;
            }
            else if(state.gridStep/state.pixelRatio>100)
                if(state.gridStep>0.001) state.gridStep=state.gridStep/10;
                state.gridStepPixels=Math.round(state.gridStep/state.pixelRatio);
    }
    setDimentions(width, height, realWidth, topLeft,state){
        state.screenHeight=height;
        state.screenWidth=width;
        state.ratio=width/height;
        this.setRealWidth(realWidth,state);
        this.setTopLeft(topLeft,state);
        this.setBoundedCircle(state);
        state.shapes=[];
        state.xAxe=new StraightLine(0,1,0);
        state.yAxe=new StraightLine(1,0,0);
        state.xAxeShape=new StraightLineShape(state.xAxe,state.boundedCircle);
        state.yAxeShape=new StraightLineShape(state.yAxe,state.boundedCircle);
        state.xAxeShape.setColor("red");
        state.yAxeShape.setColor("red");
        state.shapes.push(state.xAxeShape);
        state.shapes.push(state.yAxeShape);
    }
    cancel(state){
        state.status="FREE";
        state.curShape=null;
        state.creationStep="";
        state.currentShape="";
    }
    getBoundedCircle(){return this.state.boundedCircle;}
    setSnap(snap,state){
        state.snap=snap;
        //this.snap=snap;
    }
    setGridVisible(visible,state){
        state.showGrid=visible;
    }
    newShape(creator,state){
        state.shapeCreator=creator;
        state.curShape=state.shapeCreator.getShape();
        state.currentShape=state.shapeCreator.getShapeDescription();
        state.creationStep=state.shapeCreator.getPointDescription();
        state.status="CREATE";
    };
    drawCursor(ctx,state){
        let size=10;
        let x0=state.curPoint.x;
        let y0=state.curPoint.y;
        ctx.strokeStyle="black";
        ctx.beginPath();
        ctx.moveTo(x0-size,y0);
        ctx.lineTo(x0+size,y0);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x0,y0-size);
        ctx.lineTo(x0,y0+size);
        ctx.stroke();
    }
    drawGrid(ctx,state){
        //debugger;
        ctx.strokeStyle="grey";
        let firstX=Math.round(state.topLeft.x/state.gridStep)*state.gridStep;
        let firstY=Math.round(state.topLeft.y/state.gridStep)*state.gridStep;
        let hor=false;
        let vert=false;
        let ix=0;
        let iy=0;
        let xGridLineNumber=Math.round(firstX/state.gridStep);
        let yGridLineNumber=Math.round(firstY/state.gridStep);
        let gridLinesCountX=Math.round(state.realWidth/state.gridStep);
        let gridLinesCountY=Math.round(state.realHeight/state.gridStep);
        state.gridPointsX=new Array(gridLinesCountX);
        state.gridPointsY=new Array(gridLinesCountY);
        state.gridNumbersX=new Array(gridLinesCountX);
        state.gridNumbersY=new Array(gridLinesCountY);
        while(!hor&&!vert){
            if(!hor){
                let x=firstX+state.gridStep*ix;
                let px=this.realToScreen(new Coord2D(x,state.topLeft.y),state);
                if(xGridLineNumber%10==0) ctx.setLineDash([0]);else ctx.setLineDash([5]);
                ctx.beginPath();
                ctx.moveTo(px.x,0);
                ctx.lineTo(px.x,state.screenHeight);
                ctx.stroke();
                state.gridPointsX[ix]=px.x;
                state.gridNumbersX[ix]=x;
                ix++;
                xGridLineNumber++;
                if(x>=(state.topLeft.x+state.realWidth))hor=true;
            }
            if(!vert){
                let y=firstY-state.gridStep*iy;
                let py=this.realToScreen(new Coord2D(state.topLeft.x,y),state);
                if(yGridLineNumber%10==0) ctx.setLineDash([0]);else ctx.setLineDash([5]);
                yGridLineNumber--;
                ctx.beginPath();
                ctx.moveTo(0,py.y);
                ctx.lineTo(state.screenWidth,py.y);
                ctx.stroke();
                state.gridPointsY[iy]=py.y;
                state.gridNumbersY[iy]=y;
                iy++;
                if(y<=(state.topLeft.y-state.realWidth))vert=true;
            }

        }
        ctx.setLineDash([0]);
    }
    drawCoordinates(ctx,state){
        //console.log(state);
        ctx.strokeStyle="black";
        //debugger;
        let i=0;
        let format=0;
        let w=0;
        if(state.gridStep>=0.001){format=3;}
        if(state.gridStep>=0.01){format=2;}
        if(state.gridStep>=0.1){format=1;}
        if(state.gridStep>=1){format=0;}
        let l=0;
        let s0="";//Finding out the number with maximum length
        for(let x of state.gridNumbersX){
            if(x==null) {alert();continue};
             let s=x.toFixed(format);
            if(l<s.length){s0=s;l=s.length;}
            }
        w=ctx.measureText(s0).width;
        for(let x of state.gridPointsX){
            if(x==null) continue;
            if(x>state.marginLeft&&x<state.screenWidth-state.marginRight) {
                 let s=state.gridNumbersX[i].toFixed(format);
                 let d=1;
                 let r=w/state.gridStepPixels;
                 if(r>=1)d=2;
                 if(r>=1.5)d=5;
                 if(Math.round(state.gridNumbersX[i]/state.gridStep)%d==0)
                    ctx.strokeText(s,x-ctx.measureText(s).width/2,state.marginTop - 5);
            }
            i++;
        }
        i=0;
        for(let y of state.gridPointsY){
            if(y==null) {alert();continue};
            if(y>state.marginTop&&y<state.screenHeight-state.marginBottom){
                let s=state.gridNumbersY[i].toFixed(format);
                w=ctx.measureText(s).width;
                let h=ctx.measureText("12").width;
                let d=1;
                let r=h/state.gridStepPixels;
                if(r>0.8&&r<1.5)d=2;
                if(r>=1.5)d=5;
                if(Math.round(state.gridNumbersY[i]/state.gridStep)%d==0)
                    ctx.strokeText(s,state.marginLeft-w,y+h/3);
                    //g.drawString(s,marginLeft-w,y+h/3);
                }
             i++;
        }
    }
    drawShape(s, ctx,state){
        let first=true;
        let p0=new Point2D(0,0);
        let p;
        if(s.refresh) s.refresh(state.boundedCircle);
        s.reset();
        while(s.isNext()){
            let c=s.next();
            if(c!=null){
                if(first) {p0=this.realToScreen(c,state);first=false;continue;}
                p=this.realToScreen(c,state);
                ctx.strokeStyle=s.getColor();
                ctx.beginPath();
                ctx.moveTo(p0.x,p0.y);
                ctx.lineTo(p.x,p.y);
                ctx.stroke();
                p0=p;
            }
        }
    }
    paint(ctx,state){
        ctx.fillStyle="white";
        ctx.lineWidth=1;
        ctx.fillRect(0, 0, state.screenWidth, state.screenHeight);
        if(state.showGrid)this.drawGrid(ctx,state);
        for(let s of state.shapes){
                this.drawShape(s,ctx,state);
            }
        if(state.status=="DRAWING") {
            this.drawShape(state.curShape, ctx,state);
            }
        let status_bar=`X=${state.curCoord.x.toFixed(3)} Y=${state.curCoord.y.toFixed(3)}
             Shape: ${state.currentShape} : ${state.creationStep}`;
        ctx.fillStyle="white";
        //fill margin
        ctx.fillRect(0, 0, state.screenWidth-state.marginRight,state.marginTop);
        ctx.fillRect(0,0, state.marginLeft,state.screenHeight);
        ctx.fillRect(state.screenWidth-state.marginRight, 0, state.screenWidth,state.screenHeight);
        ctx.fillRect(state.marginLeft, state.screenHeight-state.marginBottom, state.screenWidth-state.marginRight,state.screenHeight-state.marginTop);
        ctx.strokeStyle="black";
        ctx.strokeRect(state.marginLeft, state.marginTop, state.screenWidth-state.marginRight-state.marginLeft,state.screenHeight-state.marginBottom-state.marginTop);
        this.drawCoordinates(ctx,state);
        ctx.strokeText(status_bar,state.marginLeft,state.screenHeight-state.statusBar)
        this.drawCursor(ctx,state);
    }
    load(e){
        let ctx=e.target.getContext("2d");
        //this.paint(ctx,state);
        //this.setState(this.state);
        console.log("loaded");
    }
    mmove(e){
        let ctx=e.target.getContext("2d");
        let rect=e.target.getBoundingClientRect();
        let state=Object.assign({},this.state);
        state.curPoint.x=e.clientX-rect.left;
        state.curPoint.y=e.clientY-rect.top;
        if(state.dragGrid){
            state.curCoord=this.screenToReal(state.curPoint.x,state.curPoint.y,state);
            let dx=state.curCoord.x-state.dragX0;
            let dy=state.curCoord.y-state.dragY0;
            this.setTopLeft(new Coord2D(state.topLeft.x-dx,state.topLeft.y-dy),state);
            this.setBoundedCircle(state);
        }
        if(state.curPoint.x<state.marginLeft||state.curPoint.x>state.screenWidth-state.marginRight
            ||state.curPoint.y<state.marginTop||state.curPoint.y>state.screenHeight-state.marginBottom){
            state.curPoint.x=state.prevPoint.x;
            state.curPoint.y=state.prevPoint.y;
        }
        state.curCoord=this.screenToReal(state.curPoint.x,state.curPoint.y,state);
        if(state.snap){
            state.curCoord.x=Math.round(state.curCoord.x/state.gridStep)*state.gridStep;
            state.curCoord.y=Math.round(state.curCoord.y/state.gridStep)*state.gridStep;
            state.curPoint=this.realToScreen(state.curCoord);
        }
        if(state.status=="DRAWING"){
            state.shapeCreator.setCurrent(state.curCoord);
            state.curShape=state.shapeCreator.getShape();

        }
        state.prevPoint.x=state.curPoint.x;
        state.prevPoint.y=state.curPoint.y;

        this.paint(ctx,state);
        this.setState(state);
    }
    mdown(e){
        if(e.button==1){
            let state=Object.assign({},this.state);
            let rect=e.target.getBoundingClientRect();
            state.curPoint.x=e.clientX-rect.left;
            state.curPoint.y=e.clientY-rect.top;
            state.dragGrid=true;
            state.curCoord=this.screenToReal(state.curPoint.x,state.curPoint.y,state);
            state.dragX0=state.curCoord.x;
            state.dragY0=state.curCoord.y;
            this.setState(state);
        };
    }
    mup(e){
        if(e.button==1){
            let state=Object.assign({},this.state);
            state.dragGrid=false;
            this.setState(state);
        }
    }
    componentDidMount() {
        let ctx=document.querySelector("#canvas").getContext("2d");
        let state=Object.assign({},this.state);
        this.setDimentions(550,550,20,new Coord2D(-10,10),state);
        this.paint(ctx,state);
        this.setState(state);
    }

    render(){
        return <div>
            <canvas id="canvas" width={this.state.screenWidth} height={this.state.screenHeight}
                style={{borderColor:"black",cursor:"none"}}
                onMouseMove={this.mmove.bind(this)}
                onMouseDown={this.mdown.bind(this)}
                onMouseUp={this.mup.bind(this)}
            >

            </canvas>
        </div>
    }
}
export default Screen