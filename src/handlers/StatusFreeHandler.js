import { MouseHandler } from "./MouseHandler";
import Geometry from "../utils/geometry";
import { Status } from "../reducers/screen";

export class StatusFreeHandler extends MouseHandler {
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        screenProps.shapeManager.setShapeNearPoint(this.coord,screenProps.selectDist*screenProps.pixelRatio);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
    }
    down({curPoint,screenProps}){
        this.curPoint={...curPoint};
        this.prevCoord=Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.screenWidth,screenProps.screenHeight,screenProps.topLeft,screenProps.bottomRight);
        screenProps.selectionManager.reset();
        screenProps.selectionManager.setNext(Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.screenWidth,screenProps.screenHeight,screenProps.topLeft,screenProps.bottomRight));
        screenProps.actions.setScreenStatus(Status.SELECT);
        screenProps.actions.setPrevCoord(this.prevCoord,this.curPoint);
    }
    click({screenProps}){
        screenProps.shapeManager.toggleShapeSelected();
    }
}