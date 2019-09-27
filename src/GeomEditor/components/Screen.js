import React from 'react';
import '../Graph.css';
import Geometry, {Coord2D, Point2D,Rectangle} from '../utils/geometry.js';
import ShapeStyle from './shapes/ShapeStyle';
import {Color} from './colors';
import { STATUS_FREE, STATUS_CREATE, STATUS_PAN, STATUS_SELECT, STATUS_PICK } from '../reducers/screen';
import TextShape from './shapes/TextShape';
export default class Screen extends React.Component {
    static MARKER_SIZE=0.005;
    static SNAP_MARKER_SIZE=5;
    curPoint=new Point2D();
    prevPoint=new Point2D();
    gridStep=1;gridStepPixels=1;dragGrid=false;
    gridPointsX=[];gridPointsY=[];
    gridNumbersX=[];gridNumbersY=[];
    dragX0=0;dragY0=0;
    drag=false;lbut=0o00;mbut=0o01;
    constructor(props){
        super(props);
        window.KEYDOWNHANDLE=true
        this.refCanvas=React.createRef()
    }

    getRealRect(){
        let realRect = new Rectangle();
        realRect.topLeft = this.props.topLeft;
        realRect.bottomRight=this.props.bottomRight;
        realRect.width = this.props.bottomRight.x-this.props.topLeft.x;
        realRect.height=this.props.topLeft.y-this.props.bottomRight.y;
        return realRect;
    }
    getScreenRect(){
        let screenRect = new Rectangle();
        screenRect.topLeft.x = 0;
        screenRect.topLeft.y = 0;
        screenRect.width = this.props.screenWidth;
        screenRect.height = this.props.screenHeight;
        return screenRect;
    }

    test(){
        const text=new TextShape('Text',{x:0,y:0})
        text.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID))
        text.rotate(45*Math.PI/180)
        this.props.shapes.push(text);
    }

    drawCursor(ctx){
      this.props.cursor.setCoord(this.props.curCoord);
      this.drawShape(this.props.cursor,ctx);
    }
    drawGrid(ctx){
        ctx.strokeStyle=Color.GRID;
        let solidStyle=new ShapeStyle(Color.GRAY,ShapeStyle.SOLID);
        let dashStyle=new ShapeStyle(Color.GRAY,ShapeStyle.DASH);
        let firstX=Math.round(this.props.topLeft.x/this.props.gridStep)*this.props.gridStep;
        let firstY=Math.round(this.props.topLeft.y/this.props.gridStep)*this.props.gridStep;
        let hor=false;
        let vert=false;
        let ix=0;
        let iy=0;
        let xGridLineNumber=Math.round(firstX/this.props.gridStep);
        let yGridLineNumber=Math.round(firstY/this.props.gridStep);
        let gridLinesCountX=Math.round(this.props.realWidth/this.props.gridStep);
        let gridLinesCountY=Math.round(this.props.realHeight/this.props.gridStep);
        this.gridPointsX=new Array(gridLinesCountX);
        this.gridPointsY=new Array(gridLinesCountY);
        this.gridNumbersX=new Array(gridLinesCountX);
        this.gridNumbersY=new Array(gridLinesCountY);
        while(!hor||!vert){
            if(!hor){
                let x=firstX+this.props.gridStep*ix;
                let px=Geometry.realToScreen(new Coord2D(x,this.props.topLeft.y),this.getRealRect(),this.getScreenRect());
                if(xGridLineNumber%10===0) ctx.setLineDash(solidStyle.getStroke());else ctx.setLineDash(dashStyle.getStroke());

                if(this.props.show.grid) {
                    ctx.beginPath();
                    ctx.moveTo(px.x, 0);
                    ctx.lineTo(px.x, this.props.screenHeight);
                    ctx.stroke();
                }
                this.gridPointsX[ix]=px.x;
                this.gridNumbersX[ix]=x;
                ix++;
                xGridLineNumber++;
                if(x>(this.props.topLeft.x+this.props.realWidth))hor=true;
            }
            if(!vert){
                let y=firstY-this.props.gridStep*iy;
                let py=Geometry.realToScreen(new Coord2D(this.props.topLeft.x,y),this.getRealRect(),this.getScreenRect());
                if(yGridLineNumber%10===0) ctx.setLineDash(solidStyle.getStroke());else ctx.setLineDash(dashStyle.getStroke());
                yGridLineNumber--;
                if(this.props.show.grid) {
                    ctx.beginPath();
                    ctx.moveTo(0, py.y);
                    ctx.lineTo(this.props.screenWidth, py.y);
                    ctx.stroke();
                }
                this.gridPointsY[iy]=py.y;
                this.gridNumbersY[iy]=y;
                iy++;
                if(y<(this.props.topLeft.y-this.props.realHeight))vert=true;
            }

        }
        ctx.setLineDash(solidStyle.getStroke());
    }
    drawCoordinates(ctx){
        ctx.font="10px sans-serif";
        ctx.strokeStyle="black";
        let i=0;
        let format=0;
        let w;
        if(this.props.gridStep>=0.001){format=3;}
        if(this.props.gridStep>=0.01){format=2;}
        if(this.props.gridStep>=0.1){format=1;}
        if(this.props.gridStep>=1){format=0;}
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
            if(x>this.props.marginLeft&&x<this.props.screenWidth-this.props.marginRight) {
                 let s=this.gridNumbersX[i].toFixed(format);
                 let d=1;
                 let r=w/this.props.gridStepPixels;
                 if(r>=1)d=2;
                 if(r>=1.5)d=5;
                 if(Math.round(this.gridNumbersX[i]/this.props.gridStep)%d===0)
                    ctx.strokeText(s,x-ctx.measureText(s).width/2,this.props.marginTop - 5);
            }
            i++;
        }
        i=0;
        for(let y of this.gridPointsY){
            if(y===null) continue;
            if(y>this.props.marginTop&&y<this.props.screenHeight-this.props.marginBottom){
                let s=this.gridNumbersY[i].toFixed(format);
                w=ctx.measureText(s).width;
                let h=ctx.measureText("12").width;
                let d=1;
                let r=h/this.props.gridStepPixels;
                if(r>0.8&&r<1.5)d=2;
                if(r>=1.5)d=5;
                if(Math.round(this.gridNumbersY[i]/this.props.gridStep)%d===0)
                    ctx.strokeText(s,this.props.marginLeft-w,y+h/3);
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
        ctx.lineJoin='round';
        ctx.fillRect(0, 0, this.props.screenWidth, this.props.screenHeight);
        this.drawGrid(ctx);
        this.drawShape(this.props.xAxe,ctx)
        this.drawShape(this.props.yAxe,ctx)
        let status_bar=`X=${this.props.curCoord.x.toFixed(3)} Y=${this.props.curCoord.y.toFixed(3)} `;
        let currentShape='';
        if(this.props.shapeCreator) currentShape=this.props.captions.creators[this.props.shapeCreator.getName()].description;
        let creationStep='';
        if(this.props.status===STATUS_CREATE) 
            {
            creationStep=this.props.captions.creators[this.props.shapeCreator.getName()].steps[this.props.shapeCreator.getCurrentStep()];
            status_bar=status_bar+`${currentShape}: ${creationStep}`;
            }
        if(this.props.shapeCreator){
            let curHelperShapes=null;
            curHelperShapes=this.props.shapeCreator.getHelperShapes();
            if(curHelperShapes!=null)
            for(let shape of curHelperShapes)
                this.drawShape(shape, ctx);
            let curShape=null;
            curShape=this.props.shapeCreator.getShape();
            if(curShape!=null) this.drawShape(curShape, ctx);
        }
        if(this.props.status===STATUS_PICK) {
            creationStep=this.props.captions.pickers[this.props.picker.getName()].steps[this.props.picker.getCurrentStep()];
            status_bar=status_bar+`${creationStep}`;

             }
        if(this.props.picker){
            const pickShape=this.props.picker.getShape();
            if(pickShape!=null) this.drawShape(pickShape, ctx);   
            const pickHelperShapes=this.props.picker.getHelperShapes();
            if(pickHelperShapes!=null)
            for(let shape of pickHelperShapes)
                this.drawShape(shape, ctx);
        }
        for(let shape of this.props.shapes){
                this.drawShape(shape,ctx);
                if(shape.activePointMarker) 
                        this.drawShape(shape.activePointMarker,ctx);
            }
         
        ctx.lineWidth=1;
        ctx.setLineDash(ShapeStyle.SOLID);
        ctx.fillStyle="white";
        //fill margin
        ctx.fillRect(0, 0, this.props.screenWidth-this.props.marginRight,this.props.marginTop);
        ctx.fillRect(0,0, this.props.marginLeft,this.props.screenHeight);
        ctx.fillRect(this.props.screenWidth-this.props.marginRight, 0, this.props.screenWidth,this.props.screenHeight);
        ctx.fillRect(this.props.marginLeft, this.props.screenHeight-this.props.marginBottom, this.props.screenWidth-this.props.marginRight,this.props.screenHeight-this.props.marginTop);
        ctx.strokeStyle="black";
        ctx.strokeRect(this.props.marginLeft, this.props.marginTop, this.props.screenWidth-this.props.marginRight-this.props.marginLeft,this.props.screenHeight-this.props.marginBottom-this.props.marginTop);
        this.drawCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.strokeText(status_bar,this.props.marginLeft,this.props.screenHeight-this.props.statusBar);
        if(this.props.status!==STATUS_FREE){
            let marker=this.props.snapMarkersManager.getActiveMarker();
            if(marker!=null) {
                marker.refresh(this.getRealRect(), this.getScreenRect());
                this.drawShape(marker.getMarker(), ctx);
            }
        }
        ctx.lineWidth=1;
        if(this.props.status===STATUS_SELECT){
            this.drawShape(this.props.selectionManager.getSelectionShape(),ctx);
        }
        if(this.mouseOnScreen)this.drawCursor(ctx);
    }

    isOutRect(p){
       return p.x<this.props.marginLeft||p.x>this.props.screenWidth-this.props.marginRight
        ||p.y<this.props.marginTop||p.y>this.props.screenHeight-this.props.marginBottom;
    }

    mmove(e){
        let rect=e.target.getBoundingClientRect();
        let curPoint={x:e.clientX-rect.left,y:e.clientY-rect.top};
        this.mouseOnScreen=!this.isOutRect(curPoint);
        let coord={x:this.props.curCoord.x,y:this.props.curCoord.y};

        if(this.props.status===STATUS_PAN){
            coord=Geometry.screenToReal(curPoint.x,curPoint.y,this.props.screenWidth,this.props.screenHeight,this.props.topLeft,this.props.bottomRight);
            let dx=curPoint.x-this.dragX0;
            let dy=curPoint.y-this.dragY0;
            this.dragX0=curPoint.x
            this.dragY0=curPoint.y
            const rdx=this.props.realWidth*dx/this.props.screenWidth;
            const rdy=this.props.realHeight*dy/this.props.screenHeight;
            this.props.actions.setTopLeft({x:this.props.topLeft.x-rdx,y:this.props.topLeft.y+rdy});
            this.props.actions.setBoundedCircle();
            return;
        }
        if(this.isOutRect(curPoint)){
            curPoint.x=this.prevPoint.x;
            curPoint.y=this.prevPoint.y;
        }
        coord=Geometry.screenToReal(curPoint.x,curPoint.y,this.props.screenWidth,this.props.screenHeight,this.props.topLeft,this.props.bottomRight);
        coord.x=+coord.x.toFixed(4);
        coord.y=+coord.y.toFixed(4);
        this.prevPoint.x=curPoint.x;
        this.prevPoint.y=curPoint.y;
        let temp={x:coord.x,y:coord.y};
        if(this.props.gridSnap&&this.props.status!==STATUS_FREE){
            let x=Math.round(temp.x/this.props.gridStep)*this.props.gridStep;
            let y=Math.round(temp.y/this.props.gridStep)*this.props.gridStep;
            let dx=x-temp.x;
            let dy=y-temp.y;
            if((Math.sqrt(dx*dx+dy*dy)<=this.props.snapMinDist*this.props.pixelRatio)){
                if(!this.isOutRect(Geometry.realToScreen({x,y},this.getRealRect(),this.getScreenRect()))) {
                    temp.x = x;
                    temp.y = y;
                    curPoint = Geometry.realToScreen(temp,this.getRealRect(),this.getScreenRect());
                }
                }
        }
        if(this.props.status!==STATUS_FREE){
            let d = this.props.snapMarkersManager.getDistanceToNearestMarker(temp,this.props.snapDist*this.props.pixelRatio);
            if(d>=0&&d<=this.props.snapMinDist*this.props.pixelRatio){
                temp=this.props.snapMarkersManager.getActiveMarker().getPos();
                curPoint = Geometry.realToScreen(temp,this.getRealRect(),this.getScreenRect());
            }
        }
        coord=temp;
        if(this.props.status===STATUS_FREE){
            this.props.shapeManager.setShapeNearPoint(coord,this.props.selectDist*this.props.pixelRatio);
        }
        if(this.props.status===STATUS_SELECT){
            this.props.selectionManager.setCurrent(coord);
            this.props.shapeManager.setShapeInRect(this.prevCoord,coord);
        }
        if(this.props.status===STATUS_CREATE){
            this.props.shapeCreator.setCurrent(coord);
        }
        if(this.props.status===STATUS_PICK){
            this.props.picker.setCurrent(coord);
        }
        this.props.actions.setCurCoord(coord);
        
    }
    mdown(e){
        if(e.button===1){
            let rect=e.target.getBoundingClientRect();
            const curPoint={x:e.clientX-rect.left,y:e.clientY-rect.top};
            this.dragX0=curPoint.x
            this.dragY0=curPoint.y
            this.props.actions.setScreenStatus(STATUS_PAN);
            e.preventDefault();
        }
        if(e.button===0){
            let rect=e.target.getBoundingClientRect();
            this.curPoint.x=e.clientX-rect.left;
            this.curPoint.y=e.clientY-rect.top;
            if(this.props.status===STATUS_FREE){
                this.prevCoord=Geometry.screenToReal(this.curPoint.x,this.curPoint.y,this.props.screenWidth,this.props.screenHeight,this.props.topLeft,this.props.bottomRight);
                this.props.selectionManager.reset();
                this.props.selectionManager.setNext(Geometry.screenToReal(this.curPoint.x,this.curPoint.y,this.props.screenWidth,this.props.screenHeight,this.props.topLeft,this.props.bottomRight));
                this.props.actions.setScreenStatus(STATUS_SELECT);
            }
            this.props.actions.repaint();
            e.preventDefault();
        }
    }
    mup(e){
        if(e.button===1){
            this.props.actions.setPrevStatus();
        }
        if(e.button===0){
            if(this.props.status===STATUS_SELECT){
                this.props.actions.cancel();
            }
        }
    }
    mwheel(e){
        if(this.props.status===STATUS_PAN)return;
        let rect=e.target.getBoundingClientRect();
        let p=Geometry.screenToReal(e.clientX-rect.left,e.clientY-rect.top,this.props.screenWidth,this.props.screenHeight,this.props.topLeft,this.props.bottomRight);
        if(e.deltaY>0)
        {
            if(this.props.realWidth<=1000) this.props.actions.setScale(1.2,p);
        }else{
            if(this.props.pixelRatio>=0.001)
                this.props.actions.setScale(1/1.2,p);
        }
       e.preventDefault();
    }
    mleave(){
        if(this.props.status===STATUS_PAN){
            this.props.actions.setPrevStatus();
        }
        this.mouseOnScreen=false;
        this.props.actions.repaint();
    }
    menter(){
    }
    onclick(e){
        if(e.button===0){
            if(this.props.status===STATUS_CREATE){
                this.props.shapeCreator.setNextPoint(this.props.curCoord);
                if(!this.props.shapeCreator.isNext())
                {
                    this.props.shapes.push(this.props.shapeCreator.getShape());
                    this.props.actions.refreshSnapMarkers();
                    this.props.actions.refreshShapeManager();
                    if(this.props.cyclicCreation){
                        this.props.actions.createShape(this.props.shapeCreator.reset(this.props.boundedCircle));
                    }else {
                        this.props.actions.cancel();
                    }
                }
            }
            if(this.props.status===STATUS_FREE){
                    this.props.shapeManager.toggleShapeSelected();
                }
            if(this.props.status===STATUS_PICK){
                    this.props.picker.setNextPoint(this.props.curCoord);
                    if(!this.props.picker.isNext())
                    {
                        this.props.actions.setPickedData(this.props.picker.getPickedData());
                        this.props.actions.refreshSnapMarkers();
                        this.props.actions.refreshShapeManager();
                    }
                }
        }
        this.props.actions.selectShapes(this.props.shapeManager.getSelectedShapes());
        e.preventDefault();
    }

    resize(){
        const style=window.getComputedStyle(document.querySelector('.screenContainer'));
        const sw=Number.parseInt(style.width);
        const sh=Number.parseInt(style.height);
        this.props.actions.setDimensions(sw,sh,this.props.realWidth,this.props.topLeft);
        this.canvas.width=sw;
        this.canvas.height=sh;
        this.props.actions.setBoundedCircle();
    }
    componentDidMount() {
        this.canvas=document.querySelector("#canvas");
        this.ctx=this.canvas.getContext("2d");
        this.canvas.addEventListener("mousewheel",this.mwheel.bind(this),{passive:false})
        //this.test();
        this.paint(this.ctx);
        window.addEventListener('load',()=>{
            this.resize();
            this.props.actions.centerToPoint(new Coord2D(0,0));
            this.props.actions.repaint();
            document.body.oncontextmenu=()=>false
        });
        window.addEventListener('resize',()=>{
            this.resize();
        })
        window.addEventListener('keydown',(e)=>{
            if(window.KEYDOWNHANDLE===false) return;
            this.props.keyDownHandler.forEach(key=>{
                if(e.ctrlKey===key.ctrlKey&&e.shiftKey===key.shiftKey&&e.altKey===key.altKey&&e.keyCode===key.keyCode){
                    if(this.props.actions[key.action]) this.props.actions[key.action](key.param);
                    e.preventDefault();
                }
            })
        })
        
    }

    componentDidUpdate(){
        this.props.shapeManager.setShapes(this.props.shapes,this.props.selectionType);
        this.canvas.style.cursor='none'
        this.paint(this.ctx);
    }

    render(){
        return <canvas ref={this.refCanvas} id="canvas" width={this.props.screenWidth} height={this.props.screenHeight}
                onMouseMove={this.mmove.bind(this)}
                onMouseDown={this.mdown.bind(this)}
                onMouseUp={this.mup.bind(this)}
                onMouseLeave={this.mleave.bind(this)}
                onMouseEnter={this.menter.bind(this)}
                onClick={this.onclick.bind(this)}
            >
            </canvas>
    }
}
