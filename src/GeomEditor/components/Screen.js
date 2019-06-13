import React from 'react';
import '../Graph.css';
import {SLine, Circle, Coord2D, Point2D,Rectangle} from '../utils/geometry.js';
import ShapeStyle from './shapes/ShapeStyle';
import SLineShape from "./shapes/SLineShape.js";
import SnapMarkersManager from './shapes/snapmarkers/SnapMarkersManager';
import ShapeManager from "./shapes/ShapeManager";
import FreeCursor from "./shapes/cursors/FreeCursor";
import DrawCursor from "./shapes/cursors/DrawCursor";
import {Color} from './colors';
import DragCursor from './shapes/cursors/DragCursor';
export default class Screen extends React.Component {
    showGrid=true;
    gridSnap=false;
    snapDist=20;snapMinDist=10;
    selectDist=2;
    static STATUS_FREE='FREE';
    static STATUS_CREATE='CREATE';
    static STATUS_DRAWING='DRAWING';
    static STATUS_CANCEL='CANCEL';
    static STATUS_PAN='PAN';
    static MARKER_SIZE=0.005;
    static SNAP_MARKER_SIZE=0.015;
    status='';
    prevStatus='';
    points=new Array(3);
    topLeft=new Coord2D();
    bottomRight=new Coord2D();
    boundedCircle=new Circle(0,0);
    shapes=[];
    shapeCreator=null;
    realWidth=0;realHeight=0;
    ratio=1;
    pixelRatio=1;
    marginTop=15;marginLeft=40;marginBottom=15;marginRight=10;
    screenWidth=900;screenHeight=500;
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
        this.snapMarkersManager =new SnapMarkersManager();
        this.shapeManager=new ShapeManager();
        this.screenWidth=props.screenWidth;
        this.screenHeight=props.screenHeight;
        this.state={

        }
    }
    refreshSnapMarkers(){
        this.snapMarkersManager.clear();
        for(let s of this.shapes){
            this.snapMarkersManager.addSnapMarkers(s.getMarkers());
        }
    }
    refreshShapeManager(){
        this.shapeManager=new ShapeManager(this.shapes);
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
        return {x:rx,y:ry};
    }
    realToScreen(p){
        let x=Math.round((p.x-this.topLeft.x)/this.pixelRatio);
        let y=-Math.round((p.y-this.topLeft.y)/this.pixelRatio);
        return {x,y};
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
        this.xAxe=new SLine(0,1,0);
        this.yAxe=new SLine(1,0,0);
        this.xAxeShape=new SLineShape(this.xAxe,this.boundedCircle);
        this.yAxeShape=new SLineShape(this.yAxe,this.boundedCircle);
        this.xAxeShape.setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
        this.yAxeShape.setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
        this.shapes.push(this.xAxeShape);
        this.shapes.push(this.yAxeShape);
        this.centerToPoint(new Coord2D(0,0));
        this.cursor=new FreeCursor(this.curCoord);
        this.refreshSnapMarkers();
        this.refreshShapeManager();
    }
    cancel(){
        this.status=Screen.STATUS_FREE;
        this.curShape=null;
        this.curHelperShapes=null;
        this.creationStep="";
        this.currentShape="";
        this.cursor=new FreeCursor(this.curCoord);
    }
    setStatus(status,props){
        this.prevStatus=this.status;
        switch(status){
            case Screen.STATUS_CREATE:
                this.newShape(props.creator);
                props.setStatus(Screen.STATUS_DRAWING,props.creator);
                break;
            case Screen.STATUS_CANCEL:
                this.cancel();
                break;
            case Screen.STATUS_PAN:
                this.dragGrid=true;
                this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
                this.dragX0=this.curCoord.x;
                this.dragY0=this.curCoord.y;
                this.prevCursor=this.cursor;
                this.status=status;
                this.cursor=new DragCursor(this.curCoord);
            break;
            default:
        }

    }
    getBoundedCircle(){return this.boundedCircle;}
    setGridSnap(snap){
        this.gridSnap=snap;
    }
    setSnap(snapClass,snap){
        if(snap===true) this.snapMarkersManager.addSnap(snapClass);
        else
        this.snapMarkersManager.removeSnap(snapClass);
    }
    setGridVisible(visible){
        this.showGrid=visible;
    }
    newShape(creator){
        this.shapeCreator=creator;
        this.shapeCreator.refresh(this.boundedCircle);
        this.curShape=null;//this.shapeCreator.getShape();
        this.curHelperShapes=null;//this.shapeCreator.getHelperShapes();
        this.currentShape=this.shapeCreator.getShapeDescription();
        this.creationStep=this.shapeCreator.getPointDescription();
        this.status=Screen.STATUS_CREATE;
        this.cursor=new DrawCursor(this.curCoord);
    };

    drawCursor(ctx){
      this.cursor.setCoord(this.curCoord);
      this.drawShape(this.cursor,ctx);
    }
    drawGrid(ctx){
        ctx.strokeStyle="#C0C0C0";
        let solidStyle=new ShapeStyle(Color.GRAY,ShapeStyle.SOLID);
        let dashStyle=new ShapeStyle(Color.GRAY,ShapeStyle.DASH);
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
                if(xGridLineNumber%10===0) ctx.setLineDash(solidStyle.getStroke());else ctx.setLineDash(dashStyle.getStroke());

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
                if(yGridLineNumber%10===0) ctx.setLineDash(solidStyle.getStroke());else ctx.setLineDash(dashStyle.getStroke());
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
        ctx.setLineDash(solidStyle.getStroke());
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
            if(x===null) continue;
             let s=x.toFixed(format);
            if(l<s.length){s0=s;l=s.length;}
            }
        w=ctx.measureText(s0).width;
        for(let x of this.gridPointsX){
            if(x===null) continue;
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
            if(y===null) continue;
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
        s.drawSelf(ctx,this.getRealRect(), this.getScreenRect());
    }
    paint(ctx){
        ctx.fillStyle="white";
        ctx.lineWidth=1;
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
        this.drawGrid(ctx);
        let status_bar=`X=${this.curCoord.x.toFixed(3)} Y=${this.curCoord.y.toFixed(3)}     `;
        if(this.status===Screen.STATUS_CREATE||this.status===Screen.STATUS_DRAWING)   
                status_bar=status_bar+`${this.status}: ${this.currentShape} : ${this.creationStep}`;
                else status_bar=status_bar+this.status;
        for(let shape of this.shapes){
                this.drawShape(shape,ctx);
            }
            
        if(this.curHelperShapes!=null)
                for(let shape of this.curHelperShapes)
                    this.drawShape(shape, ctx);
        if(this.curShape!=null) this.drawShape(this.curShape, ctx);
            
        ctx.lineWidth=1;
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
        let marker=this.snapMarkersManager.getActiveMarker();
        if(marker!=null) {
            marker.refresh(this.getRealRect(), this.getScreenRect());
            this.drawShape(marker.getMarker(), ctx);
        }
        ctx.lineWidth=1;
        //if(!this.dragGrid)
        this.drawCursor(ctx);
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
            this.setTopLeft({x:this.topLeft.x-dx,y:this.topLeft.y-dy});
            this.setBoundedCircle();
        }
        if(this.isOutRect(this.curPoint)){
            this.curPoint.x=this.prevPoint.x;
            this.curPoint.y=this.prevPoint.y;
        }
        this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
        this.prevPoint.x=this.curPoint.x;
        this.prevPoint.y=this.curPoint.y;
        let temp={x:this.curCoord.x,y:this.curCoord.y};
        if(this.gridSnap){
            let x=Math.round(temp.x/this.gridStep)*this.gridStep;
            let y=Math.round(temp.y/this.gridStep)*this.gridStep;
            let dx=x-temp.x;
            let dy=y-temp.y;
            if((Math.sqrt(dx*dx+dy*dy)<=this.snapMinDist*this.pixelRatio)){
                if(!this.isOutRect(this.realToScreen({x,y}))) {
                    temp.x = x;
                    temp.y = y;
                    this.curPoint = this.realToScreen({...temp});
                }
                }
        }
        let d = this.snapMarkersManager.getDistanceToNearestMarker(temp,this.snapDist*this.pixelRatio);
        if(d>=0&&d<=this.snapMinDist*this.pixelRatio){
            temp=this.snapMarkersManager.getActiveMarker().getPos();
            this.curPoint = this.realToScreen({...temp});
        }
        this.curCoord=temp;
        if(this.status===Screen.STATUS_FREE){
            this.shapeManager.setShapeNearPoint(this.curCoord,this.selectDist*this.pixelRatio);
        }
        if(this.status===Screen.STATUS_DRAWING){
            this.shapeCreator.setCurrent(this.curCoord);
            this.curShape=this.shapeCreator.getShape();
            this.curHelperShapes=this.shapeCreator.getHelperShapes();
        }

        //console.log(this.curCoord);
        this.paint(ctx);
        
    }
    mdown(e){
        if(e.button===1){
            let ctx=e.target.getContext("2d");
            let rect=e.target.getBoundingClientRect();
            this.curPoint.x=e.clientX-rect.left;
            this.curPoint.y=e.clientY-rect.top;
            this.setStatus(Screen.STATUS_PAN,this.props);
            // this.dragGrid=true;
            // this.curCoord=this.screenToReal(this.curPoint.x,this.curPoint.y);
            // this.dragX0=this.curCoord.x;
            // this.dragY0=this.curCoord.y;
            // this.prevCursor=this.cursor;
            // this.prevStatus=this.status;
            // this.cursor=new DragCursor(this.curCoord);

            this.paint(ctx);
            e.preventDefault();
        }


    }
    mup(e){
        if(e.button===1){
            let ctx=e.target.getContext("2d");
            this.dragGrid=false;
            e.target.style.cursor="none";
            this.cursor=this.prevCursor;
            this.status=this.prevStatus;
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
    mleave(e){
        if(this.dragGrid===true){
            this.dragGrid=false;
            this.status=this.prevStatus;
            this.cursor=this.prevCursor;
        }
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
                    this.shapes.push(this.curShape);
                    this.refreshSnapMarkers();
                    this.newShape(this.shapeCreator.reset(this.boundedCircle));
                    this.status=Screen.STATUS_CREATE;
                    this.refreshShapeManager();
                }
                this.paint(ctx);
            }
        }
    }

    componentDidMount() {
        let canvas=document.querySelector("#canvas");
        let ctx=canvas.getContext("2d");
        canvas.addEventListener("mousewheel",this.mwheel.bind(this),{passive:false})
        this.setDimentions(this.screenWidth,this.screenHeight,20,new Coord2D(-10,10));
        this.paint(ctx);
        
    }
    componentWillReceiveProps(nextProps, nextContext) {
        let ctx=document.querySelector("#canvas").getContext("2d");
        this.showGrid=nextProps.show.grid;

        if(nextProps.snap.snapClass!=null) {

            if (nextProps.snap.snapClass === "grid") this.gridSnap = nextProps.snap.snap;
                else
                this.setSnap(nextProps.snap.snapClass,nextProps.snap.snap);

        }
        this.setStatus(nextProps.status,nextProps);
        this.paint(ctx);
    }

    render(){
        return <div>
            <div>
            <canvas id="canvas" width={this.props.screenWidth} height={this.props.screenHeight}
                onMouseMove={this.mmove.bind(this)}
                onMouseDown={this.mdown.bind(this)}
                onMouseUp={this.mup.bind(this)}
                onMouseLeave={this.mleave.bind(this)}
                onClick={this.onclick.bind(this)}
            >

            </canvas>
            </div>
        </div>
    }
}
