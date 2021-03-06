import React from 'react';
import Geometry, {Coord2D, Point2D,Rectangle} from '../utils/geometry.js';
import ShapeStyle from './shapes/ShapeStyle';
import {Color} from './colors';
import { Status } from '../reducers/model';
import TextShape from './shapes/TextShape';
export default class ViewPort extends React.Component {
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
        screenRect.width = this.props.viewPortWidth;
        screenRect.height = this.props.viewPortHeight;
        return screenRect;
    }

    test(){
        const text=new TextShape('Text',{x:0,y:0})
        text.setStyle(new ShapeStyle(Color.BLACK,ShapeStyle.SOLID))
        text.rotate(45*Math.PI/180)
        this.props.shapes.push(text);
    }

    drawCursor(ctx){
      this.props.cursor.setPosition(this.props.curRealPoint);
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
                    ctx.moveTo(px.x+0.5, 0+0.5);
                    ctx.lineTo(px.x+0.5, this.props.viewPortHeight+0.5);
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
                    ctx.moveTo(0+0.5, py.y+0.5);
                    ctx.lineTo(this.props.viewPortWidth+0.5, py.y+0.5);
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
            if(x>this.props.marginLeft&&x<this.props.viewPortWidth-this.props.marginRight) {
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
            if(y>this.props.marginTop&&y<this.props.viewPortHeight-this.props.marginBottom){
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
        ctx.fillRect(0, 0, this.props.viewPortWidth, this.props.viewPortHeight);
        this.drawGrid(ctx);
        this.drawShape(this.props.xAxe,ctx)
        this.drawShape(this.props.yAxe,ctx)
        let status_bar=`X=${this.props.curRealPoint.x.toFixed(3)} Y=${this.props.curRealPoint.y.toFixed(3)} `;
        const curHelperShapes=this.props.mouseHandler.curHelperShapes;
        if(curHelperShapes!=null)
            for(let shape of curHelperShapes)
                this.drawShape(shape, ctx);
        let curShape=this.props.mouseHandler.curShape;
        if(curShape!=null) this.drawShape(curShape, ctx);
        
        for(let shape of this.props.shapes){
                this.drawShape(shape,ctx);
            }
        status_bar=status_bar+this.props.mouseHandler.statusBar;
        ctx.lineWidth=1;
        ctx.setLineDash(ShapeStyle.SOLID);
        ctx.fillStyle="white";
        //fill margin
        ctx.fillRect(0, 0, this.props.viewPortWidth-this.props.marginRight,this.props.marginTop);
        ctx.fillRect(0,0, this.props.marginLeft,this.props.viewPortHeight);
        ctx.fillRect(this.props.viewPortWidth-this.props.marginRight, 0, this.props.viewPortWidth,this.props.viewPortHeight);
        ctx.fillRect(this.props.marginLeft, this.props.viewPortHeight-this.props.marginBottom, this.props.viewPortWidth-this.props.marginRight,this.props.viewPortHeight-this.props.marginTop);
        ctx.strokeStyle="black";
        ctx.strokeRect(this.props.marginLeft, this.props.marginTop, this.props.viewPortWidth-this.props.marginRight-this.props.marginLeft,this.props.viewPortHeight-this.props.marginBottom-this.props.marginTop);
        this.drawCoordinates(ctx);
        ctx.font="12px sans-serif";
        ctx.strokeText(status_bar,this.props.marginLeft,this.props.viewPortHeight-this.props.statusBar);
            let marker=this.props.snapMarkersManager.getActiveMarker();
            if(marker!=null) {
                marker.refresh(this.getRealRect(), this.getScreenRect());
                this.drawShape(marker.getMarker(), ctx);
            }
        ctx.lineWidth=1;
        // if(this.props.status===Status.SELECT){
        //     this.drawShape(this.props.selectionShape.getSelectionShape(),ctx);
        // }
        if(this.props.mouseHandler.mouseOnScreen)this.drawCursor(ctx);
    }

    isOutRect(p){
       return p.x<this.props.marginLeft||p.x>this.props.viewPortWidth-this.props.marginRight
        ||p.y<this.props.marginTop||p.y>this.props.viewPortHeight-this.props.marginBottom;
    }
    mmoveHandle(e){
        let rect=e.target.getBoundingClientRect();
        let curPoint={x:e.clientX-rect.left,y:e.clientY-rect.top};
        this.props.mouseHandler.move({curPoint,screenProps:this.props,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey})
    }
    mdownHandle(e){
        if(e.button===1||e.button===2){
            this.props.actions.setScreenStatus(Status.PAN);
            e.preventDefault();
        }
        if(e.button===0){
            let rect=e.target.getBoundingClientRect();
            this.curPoint.x=e.clientX-rect.left;
            this.curPoint.y=e.clientY-rect.top;
            this.props.mouseHandler.down({curPoint:this.curPoint,screenProps:this.props,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey});
            this.props.actions.repaint();
            e.preventDefault();
        }
    }

    mupHandle(e){
        if(e.button===1||e.button===2){
            this.props.actions.setPrevStatus();
        }
        if(e.button===0){
            this.props.mouseHandler.up({screenProps:this.props});
        }
    }
 
    mwheelHandle(e){
        if(this.props.status===Status.PAN)return;
        let rect=e.target.getBoundingClientRect();
        let point=Geometry.screenToReal(e.clientX-rect.left,e.clientY-rect.top,this.props.viewPortWidth,this.props.viewPortHeight,this.props.topLeft,this.props.bottomRight);
        this.props.mouseHandler.wheel({deltaY:e.deltaY,point,screenProps:this.props,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey})
       e.preventDefault();
    }
    mleaveHandle(){
        this.props.mouseHandler.leave({screenProps:this.props});
        this.props.actions.repaint();
    }

    menter(){
    }

    clickHandle(e){
        let rect=e.target.getBoundingClientRect();
        this.curPoint.x=e.clientX-rect.left;
        this.curPoint.y=e.clientY-rect.top;
        if(e.button===0){
            this.props.mouseHandler.click({curPoint:this.curPoint,screenProps:this.props,shiftKey:e.shiftKey,ctrlKey:e.ctrlKey,altKey:e.altKey});
        }
        this.props.actions.selectShapes(this.props.selectionManager.getSelectedShapes());
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
        this.canvas.addEventListener("mousewheel",this.mwheelHandle.bind(this),{passive:false})
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
        window.addEventListener('keyup',(e)=>{
            this.props.cursor.setAdditional({shiftKey:e.shiftKey,altKey:e.altKey});
            this.props.actions.repaint();
        });
        window.addEventListener('keydown',(e)=>{
            if(window.KEYDOWNHANDLE===false) return;
            this.props.cursor.setAdditional({shiftKey:e.shiftKey,altKey:e.altKey});
            this.props.keyDownHandler.forEach(key=>{
                if(e.ctrlKey===key.ctrlKey&&e.shiftKey===key.shiftKey&&e.altKey===key.altKey&&e.keyCode===key.keyCode){
                    if(this.props.actions[key.action]) this.props.actions[key.action](key.param);
                    e.preventDefault();
                }
            })
            this.props.actions.repaint();
        })
        
    }

    componentDidUpdate(){
        this.props.selectionManager.setShapes(this.props.shapes,this.props.selectionType);
        this.canvas.style.cursor='none'
        this.paint(this.ctx);
    }

    render(){
        return <canvas ref={this.refCanvas} id="canvas" width={this.props.viewPortWidth} height={this.props.viewPortHeight}
                onMouseMove={this.mmoveHandle.bind(this)}
                onMouseDown={this.mdownHandle.bind(this)}
                onMouseUp={this.mupHandle.bind(this)}
                onMouseLeave={this.mleaveHandle.bind(this)}
                onMouseEnter={this.menter.bind(this)}
                onClick={this.clickHandle.bind(this)}
            >
            </canvas>
    }
}
