import { Status } from "../reducers/screen";
import Geometry, { Rectangle } from "../utils/geometry";

export class MouseHandler {
    constructor({point,curScreenPoint}){
        this.coord=point
        this.curPoint=curScreenPoint;
        this.prevCoord={...point}
    }
    isOutRect(p,screenProps){
        return p.x<screenProps.marginLeft||p.x>screenProps.screenWidth-screenProps.marginRight
         ||p.y<screenProps.marginTop||p.y>screenProps.screenHeight-screenProps.marginBottom;
     }
     move({curPoint,screenProps}){
        this.prevPoint={...this.curPoint}
        this.curPoint={...curPoint}

        this.coord=Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.screenWidth,screenProps.screenHeight,screenProps.topLeft,screenProps.bottomRight);
        this.coord.x=+this.coord.x.toFixed(4);
        this.coord.y=+this.coord.y.toFixed(4);

        //this.coord={x:this.options.curCoord.x,y:this.options.curCoord.y};
        this.mouseOnScreen=!this.isOutRect(this.curPoint,screenProps);
        if(!this.mouseOnScreen){
            this.curPoint.x=this.prevPoint.x;
            this.curPoint.y=this.prevPoint.y;
        }

     }
     mouseOnScreen(screenProps){
         return !this.isOutRect(this.curPoint,screenProps);
     }
     down(){}
     up(){}
     leave(){
         this.mouseOnScreen=false;
     }
     wheel({deltaY,point,screenProps}){
        if(deltaY>0)
        {
            if(screenProps.realWidth<=1000) screenProps.actions.setScale(1.2,point);
        }else{
            if(screenProps.pixelRatio>=0.001) screenProps.actions.setScale(1/1.2,point);
        }
     }
     snap(screenProps){
        let temp={x:this.coord.x,y:this.coord.y};
        if(screenProps.gridSnap){
            let x=Math.round(temp.x/screenProps.gridStep)*screenProps.gridStep;
            let y=Math.round(temp.y/screenProps.gridStep)*screenProps.gridStep;
            let dx=x-temp.x;
            let dy=y-temp.y;
            if((Math.sqrt(dx*dx+dy*dy)<=screenProps.snapMinDist*screenProps.pixelRatio)){
                if(!this.isOutRect(Geometry.realToScreen({x,y},this.getRealRect(screenProps),this.getScreenRect(screenProps)),screenProps)) {
                    temp.x = x;
                    temp.y = y;
                    this.curPoint = Geometry.realToScreen(temp,this.getRealRect(screenProps),this.getScreenRect(screenProps));
                }
                }
        }
        if(screenProps.status!==Status.FREE){
            let d = screenProps.snapMarkersManager.getDistanceToNearestMarker(temp,screenProps.snapDist*screenProps.pixelRatio);
            if(d>=0&&d<=screenProps.snapMinDist*screenProps.pixelRatio){
                temp=screenProps.snapMarkersManager.getActiveMarker().getPos();
                this.curPoint = Geometry.realToScreen(temp,this.getRealRect(screenProps),this.getScreenRect(screenProps));
            }
        }
        this.coord=temp;
     }

     getRealRect(screenProps){
        let realRect = new Rectangle();
        realRect.topLeft = screenProps.topLeft;
        realRect.bottomRight=screenProps.bottomRight;
        realRect.width = screenProps.bottomRight.x-screenProps.topLeft.x;
        realRect.height=screenProps.topLeft.y-screenProps.bottomRight.y;
        return realRect;
    }
    getScreenRect(screenProps){
        let screenRect = new Rectangle();
        screenRect.topLeft.x = 0;
        screenRect.topLeft.y = 0;
        screenRect.width = screenProps.screenWidth;
        screenRect.height = screenProps.screenHeight;
        return screenRect;
    }

}