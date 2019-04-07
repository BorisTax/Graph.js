import React from 'react';
import '../App.css';
import {StraightLine, Circle, Coord2D, Point2D,Rectangle} from '../utils/geometry/geometry.js';
import ShapeStyle from './shapes/ShapeStyle';
import StraightLineShape from "./shapes/StraightLineShape.js";
export default class Screen extends React.Component {
    showGrid=true;
    snap=false;
    snapDist=10;
    static STATUS_FREE='FREE';
    static STATUS_CREATE='CREATE';
    static STATUS_DRAWING='DRAWING';
    static STATUS_CANCEL='CANCEL';
    static MARKER_SIZE=0.005;
    status='';
    points=new Array(3);
    topLeft=new Coord2D();
    bottomRight=new Coord2D();
    boundedCircle=new Circle(0,0);
    shapes=[];
    curShapes=[];
    shapeCreator=null;
    realWidth=0;realHeight=0;
    ratio=1;
    pixelRatio=1;
    marginTop=15;marginLeft=40;marginBottom=15;marginRight=10;
    screenWidth=500;screenHeight=500;
    statusBar=5;
    xAxe=null;yAxe=null;
    curPoint=new Point2D();
    prevPoint=new Point2D();
    curCoord=new Coord2D();

    gridStep=1;gridStepPixels=1;dragGrid=false;
    gridPointsX=[];gridPointsY=[];
    gridNumbersX=[];gridNumbersY=[];
    dragX0=0;dragY0=0;
    creationStep="";currentShape="";
    curColor="black";
    drag=false;lbut=0o00;mbut=0o01;
    constructor(props){
        super(props);
        this.status=Screen.STATUS_FREE;
        this.screenWidth=props.screenWidth;
        this.screenHeight=props.screenHeight;
        this.state={

        }
    }
    setBoundedCircle(){
        let c=this.screenToReal(this.screenWidth/2,this.screenHeight/2);
        let r=Math.sqrt(this.realWidth*this.realWidth+this.realHeight*this.realHeight)/2;
        this.boundedCircle=new Circle(c,r);
        if(this.shapeCreator!=null) this.shapeCreator.refresh(this.boundedCircle);
    }
    screenToReal(x,y){
        let rx=x/this.screenWidth*this.realWidth+this.topLeft.x;
        let ry=this.topLeft.y-y/this.screenHeight*this.realHeight;
        return new Coord2D(rx,ry);
    }
    realToScreen(p){
        let x=Math.round((p.x-this.topLeft.x)/this.pixelRatio);
        let y=-Math.round((p.y-this.topLeft.y)/this.pixelRatio);
        return new Point2D(x,y);
    }
    getRealRect(){
        let realRect = new Rectangle();
        realRect.topLeft = this.topLeft;
        realRect.width = this.bottomRight.x-this.topLeft.x;
        realRect.height=this.topLeft.y-this.bottomRight.y;
        return realRect;
    }
    getScreenRect(){
        let screenRect = new Rectangle();
        screenRect.topLeft.x = 0;
        screenRect.topLeft.y = 0;
        screenRect.width = this.screenWidth;
        screenRect.height = this.screenHeight;
        return screenRect;
    }
    setTopLeft(p){
        this.topLeft=p;
        this.bottomRight={};
        this.bottomRight.x=this.topLeft.x+this.realWidth;
        this.bottomRight.y=this.topLeft.y-this.realHeight;
    }
    setRealWidth(width){
       this.realWidth=width;
       this.pixelRatio=this.realWidth/this.screenWidth;
       this.realHeight=this.screenHeight*this.pixelRatio;
       this.gridStepPixels=Math.round(this.gridStep/this.pixelRatio);
       this.bottomRight={};
       this.bottomRight.x=this.topLeft.x+this.realWidth;
       this.bottomRight.y=this.topLeft.y-this.realHeight;
    }
    setScale(scale,anchor){
        let dx=anchor.x-this.topLeft.x;
        let dy=anchor.y-this.topLeft.y;
        this.setRealWidth(this.realWidth*scale);
        dx=dx*scale;
        dy=dy*scale;
        this.setTopLeft(new Coord2D(anchor.x-dx,anchor.y-dy));
        this.setBoundedCircle();
        if(this.gridStep/this.pixelRatio<10){
            if (this.gridStep<1000000) this.gridStep=this.gridStep*10;
            }
            else if(this.gridStep/this.pixelRatio>100)
                if(this.gridStep>0.001) this.gridStep=this.gridStep/10;
                this.gridStepPixels=Math.round(this.gridStep/this.pixelRatio);
    }
    centerToPoint(point){
        let viewPortWidth=this.realWidth-(this.marginLeft+this.marginRight)*this.pixelRatio;
        let viewPortHeight=this.realHeight-(this.marginTop+this.marginBottom)*this.pixelRatio;
        this.setTopLeft(new Coord2D(point.x-viewPortWidth/2-this.marginLeft*this.pixelRatio,point.y+viewPortHeight/2+this.marginTop*this.pixelRatio));
        this.setBoundedCircle();
        this.setState(this.state);
    }
    setDimentions(width, height, realWidth, topLeft){
        this.screenHeight=height;
        this.screenWidth=width;
        this.ratio=width/height;
        this.setRealWidth(realWidth);
        this.setTopLeft(topLeft);
        this.setBoundedCircle();
        this.shapes=[];
        this.xAxe=new StraightLine(0,1,0);
        this.yAxe=new StraightLine(1,0,0);
        this.xAxeShape=[new StraightLineShape(this.xAxe,this.boundedCircle)];
        this.yAxeShape=[new StraightLineShape(this.yAxe,this.boundedCircle)];
        this.xAxeShape[0].setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
        this.yAxeShape[0].setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
        this.shapes.push(this.xAxeShape);
        this.shapes.push(this.yAxeShape);
        this.centerToPoint(new Coord2D(0,0));
    }
    cancel(){
        this.status=Screen.STATUS_FREE;
        this.curShape=null;
        this.curHelperShapes=null;
        this.creationStep="";
        this.currentShape="";
    }
    getBoundedCircle(){return this.boundedCircle;}
    setSnap(snap){
        this.snap=snap;
        //this.snap=snap;
    }
    setGridVisible(visible){
        this.showGrid=visible;
    }
    newShape(creator){
        this.shapeCreator=creator;
        this.shapeCreator.refresh(this.boundedCircle);
        //this.shapeCreator.reset(this.boundedCircle);
        this.curShapes=this.shapeCreator.getShapes();
        this.curHelperShapes=this.shapeCreator.getHelperShapes();
        this.currentShape=this.shapeCreator.getShapeDescription();
        this.creationStep=this.shapeCreator.getPointDescription();
        this.status=Screen.STATUS_CREATE;

    };

    drawCursor(ctx){
        let size=10;
        let x0=this.curPoint.x;
        let y0=this.curPoint.y;
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
    drawGrid(ctx){
        ctx.strokeStyle="#C0C0C0";

        let firstX=Math.round(this.topLeft.x/this.gridStep)*this.gridStep;
        let firstY=Math.round(this.topLeft.y/this.gridStep)*this.gridStep;
        let hor=false;
        let vert=false;
        let ix=0;
        let iy=0;
        let xGridLineNumber=Math.round(firstX/this.gridStep);
        let yGridLineNumber=Math.round(firstY/this.gridStep);
        let gridLinesCountX=Math.round(this.realWidth/this.gridStep);
        let gridLinesCountY=Math.round(this.realHeight/this.gridStep);
        this.gridPointsX=new Array(gridLinesCountX);
        this.gridPointsY=new Array(gridLinesCountY);
        this.gridNumbersX=new Array(gridLinesCountX);
        this.gridNumbersY=new Array(gridLinesCountY);
        while(!hor||!vert){
            if(!hor){
                let x=firstX+this.gridStep*ix;
                let px=this.realToScreen(new Coord2D(x,this.topLeft.y));
                if(xGridLineNumber%10===0) ctx.setLineDash(ShapeStyle.SOLID);else ctx.setLineDash(ShapeStyle.DASH);

                if(this.showGrid) {
                    ctx.beginPath();
                    ctx.moveTo(px.x, 0);
                    ctx.lineTo(px.x, this.screenHeight);
                    ctx.stroke();
                }
                this.gridPointsX[ix]=px.x;
                this.gridNumbersX[ix]=x;
                ix++;
                xGridLineNumber++;
                if(x>(this.topLeft.x+this.realWidth))hor=true;
            }
            if(!vert){
                let y=firstY-this.gridStep*iy;
                let py=this.realToScreen(new Coord2D(this.topLeft.x,y));
                if(yGridLineNumber%10===0) ctx.setLineDash(ShapeStyle.SOLID);else ctx.setLineDash(ShapeStyle.DASH);
                yGridLineNumber--;
                if(this.showGrid) {
                    ctx.beginPath();
                    ctx.moveTo(0, py.y);
                    ctx.lineTo(this.screenWidth, py.y);
                    ctx.stroke();
                }
                this.gridPointsY[iy]=py.y;
                this.gridNumbersY[iy]=y;
                iy++;
                if(y<(this.topLeft.y-this.realHeight))vert=true;
            }

        }
        ctx.setLineDash(ShapeStyle.SOLID);
    }
    drawCoordinates(ctx){
        ctx.font="10px sans-serif";
        ctx.strokeStyle="black";
        //debugger;
        let i=0;
        let format=0;
        let w;
        if(this.gridStep>=0.001){format=3;}
        if(this.gridStep>=0.01){format=2;}
        if(this.gridStep>=0.1){format=1;}
        if(this.gridStep>=1){format=0;}
        let l=0;
        let s0="";//Finding out the number with maximum length
        for(let x of this.gridNumbersX){
            if(x==null) continue;
             let s=x.toFixed(format);
            if(l<s.length){s0=s;l=s.length;}
            }
        w=ctx.measureText(s0).width;
        for(let x of this.gridPointsX){
            if(x==null) continue;
            if(x>this.marginLeft&&x<this.screenWidth-this.marginRight) {
                 let s=this.gridNumbersX[i].toFixed(format);
                 let d=1;
                 let r=w/this.gridStepPixels;
                 if(r>=1)d=2;
                 if(r>=1.5)d=5;
                 if(Math.round(this.gridNumbersX[i]/this.gridStep)%d===0)
                    ctx.strokeText(s,x-ctx.measureText(s).width/2,this.marginTop - 5);
            }
            i++;
        }
        i=0;
        for(let y of this.gridPointsY){
            if(y==null) continue;
            if(y>this.marginTop&&y<this.screenHeight-this.marginBottom){
                let s=this.gridNumbersY[i].toFixed(format);
                w=ctx.measureText(s).width;
                let h=ctx.measureText("12").width;
                let d=1;
                let r=h/this.gridStepPixels;
                if(r>0.8&&r<1.5)d=2;
                if(r>=1.5)d=5;
                if(Math.round(this.gridNumbersY[i]/this.gridStep)%d===0)
                    ctx.strokeText(s,this.marginLeft-w,y+h/3);
                    //g.drawString(s,marginLeft-w,y+h/3);
                }
             i++;
        }
    }
    drawShape(s, ctx){
        ctx.strokeStyle=s.getStyle().getColor();
        ctx.setLineDash(s.getStyle().getStroke());
        s.drawSelf(ctx,this.getRealRect(), this.getScreenRect());
    }
    paint(ctx){
        ctx.fillStyle="white";
        ctx.lineWidth=1;
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
        this.drawGrid(ctx);
        let status_bar=`X=${this.curCoord.x.toFixed(3)} Y=${this.curCoord.y.toFixed(3)}
             ${this.status}: ${this.currentShape} : ${this.creationStep}`;
        for(let shape of this.shapes){
            for(let s of shape)
                this.drawShape(s,ctx);
            }
            
        if(this.status===Screen.STATUS_DRAWING) {
            if(this.curHelperShapes!=null)
                for(let shape of this.curHelperShapes)
                    this.drawShape(shape, ctx);
            for(let shape of this.curShapes)
                this.drawShape(shape, ctx);
            }

        ctx.fillStyle="white";
        //fill margin
        ctx.fillRect(0, 0, this.screenWidth-this.marginRight,this.marginTop);
        ctx.fillRect(0,0, this.marginLeft,this.screenHeight);
        ctx.fillRect(this.screenWidth-this.marginRight, 0, this.screenWidth,this.screenHeight);
        ctx.fillRect(this.marginLeft, this.screenHeight-this.marginBottom, this.screenWidth-this.marginRight,this.screenHeight-this.marginTop);
        ctx.strokeStyle="black";
        ctx.strokeRect(this.marginLeft, this.marginTop, this.screenWidth-this.marginRight-this.marginLeft,this.screenHeight-this.marginBottom-this.marginTop);
        this.drawCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.strokeText(status_bar,this.marginLeft,this.screenHeight-this.statusBar);
        if(!this.dragGrid)this.drawCursor(ctx);
    }

    isOutRect(p){
       return p.x<this.marginLeft||p.x>this.screenWidth-this.marginRight
        ||p.y<this.marginTop||p.y>this.screenHeight-this.marginBottom;
    }
    mmove(e){
        let ctx=e.target.getContext("2d");
        let rect=e.target.getBoundingClientRect();
        
        this.curPoint.x=e.clientX-rect.left;
        this.curPoint.y=e.clientY-rect.top;
        if(this.dragGrid){
            this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
            let dx=this.curCoord.x-this.dragX0;
            let dy=this.curCoord.y-this.dragY0;
            this.setTopLeft(new Coord2D(this.topLeft.x-dx,this.topLeft.y-dy));
            this.setBoundedCircle();
        }
        if(this.isOutRect(this.curPoint)){
            this.curPoint.x=this.prevPoint.x;
            this.curPoint.y=this.prevPoint.y;
        }
        this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
        this.prevPoint.x=this.curPoint.x;
        this.prevPoint.y=this.curPoint.y;

        if(this.snap){
            let x=Math.round(this.curCoord.x/this.gridStep)*this.gridStep;
            let y=Math.round(this.curCoord.y/this.gridStep)*this.gridStep;
            let dx=x-this.curCoord.x;
            let dy=y-this.curCoord.y;
            if((Math.sqrt(dx*dx+dy*dy)<=this.snapDist*this.pixelRatio)){
                if(!this.isOutRect(this.realToScreen(new Coord2D(x,y)))) {
                    this.curCoord.x = x;
                    this.curCoord.y = y;
                    this.curPoint = this.realToScreen(this.curCoord);
                }
                }
        }
        if(this.status===Screen.STATUS_DRAWING){
            this.shapeCreator.setCurrent(this.curCoord);
            this.curShapes=this.shapeCreator.getShapes();
            this.curHelperShapes=this.shapeCreator.getHelperShapes();
        }


        this.paint(ctx);
        
    }
    mdown(e){
        if(e.button===1){
            let ctx=e.target.getContext("2d");
            let rect=e.target.getBoundingClientRect();
            this.curPoint.x=e.clientX-rect.left;
            this.curPoint.y=e.clientY-rect.top;
            this.dragGrid=true;
            this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
            this.dragX0=this.curCoord.x;
            this.dragY0=this.curCoord.y;
            e.target.style.cursor="move";
            this.paint(ctx);
            e.preventDefault();
        }


    }
    mup(e){
        if(e.button===1){
            let ctx=e.target.getContext("2d");
            this.dragGrid=false;
            e.target.style.cursor="none";
            this.paint(ctx);
        }
    }
    mwheel(e){
        
        if(this.dragGrid)return;
        let ctx=e.target.getContext("2d");
        let rect=e.target.getBoundingClientRect();
        let p=this.screenToReal(e.clientX-rect.left,e.clientY-rect.top);
        if(e.deltaY>0)
        {
            if(this.realWidth<=1000) this.setScale(1.2,p);
        }else{
            if(this.pixelRatio>=0.001)
                this.setScale(1/1.2,p);
        }
        this.paint(ctx);
        
       e.preventDefault();
        

    }
    onclick(e){
        if(e.button===0){
            if(this.status===Screen.STATUS_CREATE||this.status===Screen.STATUS_DRAWING){
                let ctx=document.querySelector("#canvas").getContext("2d");
                this.shapeCreator.setNextPoint(this.curCoord);
                this.creationStep=this.shapeCreator.getPointDescription();
                this.status=Screen.STATUS_DRAWING;
                this.props.setStatus(Screen.STATUS_DRAWING);
                if(!this.shapeCreator.isNext())
                {
                    this.shapes.push(this.curShapes);
                    this.newShape(this.shapeCreator.reset(this.boundedCircle));
                    this.status=Screen.STATUS_CREATE;
                }
                this.paint(ctx);
            }
        }
    }

    componentDidMount() {
        let ctx=document.querySelector("#canvas").getContext("2d");
        
        this.setDimentions(this.screenWidth,this.screenHeight,20,new Coord2D(-10,10));
        this.paint(ctx);
        
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let ctx=document.querySelector("#canvas").getContext("2d");
        this.showGrid=nextProps.show.grid;
        this.snap=nextProps.snap.grid;
        switch(nextProps.status) {
            case Screen.STATUS_CREATE:
                this.newShape(nextProps.creator);
                nextProps.setStatus(Screen.STATUS_DRAWING,nextProps.creator);
                break;
            case Screen.STATUS_CANCEL:
                this.cancel();
                break;
            default:
        }
        this.paint(ctx);

    }

    render(){
        return <div>
            <div>
            <canvas id="canvas" width={this.props.screenWidth} height={this.props.screenHeight}
                onMouseMove={this.mmove.bind(this)}
                onMouseDown={this.mdown.bind(this)}
                onMouseUp={this.mup.bind(this)}
                onWheel={this.mwheel.bind(this)}
                onClick={this.onclick.bind(this)}
            >

            </canvas>
            </div>
        </div>
    }
}
