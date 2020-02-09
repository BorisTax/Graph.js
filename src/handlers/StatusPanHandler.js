import { MouseHandler } from "./MouseHandler";

export class StatusPanHandler extends MouseHandler {
    constructor({point,curScreenPoint}){
        super({point,curScreenPoint});
        this.dragX0=point.x;
        this.dragY0=point.y;
    }
    move({curPoint,screenProps}){
        //let coord=Geometry.screenToReal(curPoint.x,curPoint.y,screenProps.screenWidth,screenProps.screenHeight,screenProps.topLeft,screenProps.bottomRight);
        super.move({curPoint,screenProps});
        let dx=this.coord.x-this.dragX0;
        let dy=this.coord.y-this.dragY0;
        screenProps.actions.setTopLeft({x:screenProps.topLeft.x-dx,y:screenProps.topLeft.y-dy});
        screenProps.actions.setBoundedCircle();
    }
    wheel(){}
    leave({screenProps}){
        super.leave();
        screenProps.actions.setPrevStatus();
    }
}