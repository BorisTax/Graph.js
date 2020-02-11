import { MouseHandler } from "./MouseHandler";

export class StatusSelectHandler extends MouseHandler {
    move({curPoint,screenProps,shiftKey,altKey}){
        super.move({curPoint,screenProps});
        //this.snap(screenProps);
        screenProps.selectionManager.setCurrent(screenProps.curCoord);
        screenProps.shapeManager.findShapeInRect(this.prevCoord,this.coord,shiftKey,altKey);
        screenProps.shapeManager.findShapeNearPoint(this.coord,screenProps.selectDist*screenProps.pixelRatio);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
    }
    up({screenProps}){
        screenProps.actions.cancel();
    }
    click({screenProps,shiftKey,altKey}){
        //screenProps.shapeManager.selectShapes({shiftKey,altKey});
        //screenProps.shapeManager.selectControlPoints(this.coord,screenProps.selectDist*screenProps.pixelRatio,shiftKey);
    }
}