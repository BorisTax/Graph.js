import { MouseHandler } from "./MouseHandler";

export class StatusSelectHandler extends MouseHandler {
    constructor({point,curScreenPoint}){
        super({point,curScreenPoint});
    }
    move({curPoint,screenProps,shiftKey,altKey}){
        super.move({curPoint,screenProps});
        //this.snap(screenProps);
        screenProps.selectionShape.setCurrent(screenProps.curCoord);
        screenProps.selectionManager.findShapeInRect(this.prevCoord,this.coord,shiftKey,altKey);
        screenProps.selectionManager.findShapeNearPoint(this.coord,screenProps.selectDist*screenProps.pixelRatio);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        this.curShape=screenProps.selectionShape.getSelectionShape();
    }
    up({screenProps}){
        screenProps.actions.abort();
    }
    click({screenProps,shiftKey,altKey}){
        //screenProps.selectionManager.selectShapes({shiftKey,altKey});
        //screenProps.selectionManager.selectControlPoints(this.coord,screenProps.selectDist*screenProps.pixelRatio,shiftKey);
    }
}