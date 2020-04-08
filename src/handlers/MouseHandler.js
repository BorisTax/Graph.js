import Geometry, { Rectangle } from "../utils/geometry";

export class MouseHandler {
    constructor(state){
        this.coord=state.curRealPoint
        this.curPoint=state.curScreenPoint;
        this.prevCoord=this.coord
        this.clickCount=0;
        this.curShape=null;
        this.curHelperShapes=null;
        this.statusBar='';
    }
    click({curPoint,screenProps}){
        this.clickCount++;
        //this.coord=Geometry.screenToReal(curPoint.x,curPoint.y,screenProps.viewPortWidth,screenProps.viewPortHeight,screenProps.topLeft,screenProps.bottomRight);
        this.coord=screenProps.curRealPoint;
    }
    isOutRect(p,screenProps){
        return p.x<screenProps.marginLeft||p.x>screenProps.viewPortWidth-screenProps.marginRight
         ||p.y<screenProps.marginTop||p.y>screenProps.viewPortHeight-screenProps.marginBottom;
     }
     move({curPoint,screenProps}){
        this.prevPoint={...this.curPoint}
        this.curPoint={...curPoint}

        this.coord=Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.viewPortWidth,screenProps.viewPortHeight,screenProps.topLeft,screenProps.bottomRight);
        this.coord.x=+this.coord.x.toFixed(4);
        this.coord.y=+this.coord.y.toFixed(4);

        //this.coord={x:this.options.curRealPoint.x,y:this.options.curRealPoint.y};
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
        let d = screenProps.snapMarkersManager.getDistanceToNearestMarker(temp,screenProps.snapDist*screenProps.pixelRatio);
        if(d>=0&&d<=screenProps.snapMinDist*screenProps.pixelRatio){
            temp=screenProps.snapMarkersManager.getActiveMarker().getPos();
            this.curPoint = Geometry.realToScreen(temp,this.getRealRect(screenProps),this.getScreenRect(screenProps));
            }
        this.coord=temp;
     }
     getCurrentStep(){
         return this.currentStep;
     }
     getCaptionsKey(){
         return "";
     }
     getProperties(){
         return this.properties;
     }
     setProperties(props){
        this.properties=props;
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
        screenRect.width = screenProps.viewPortWidth;
        screenRect.height = screenProps.viewPortHeight;
        return screenRect;
    }

}