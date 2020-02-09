import { MouseHandler } from "./MouseHandler";

export class StatusSelectHandler extends MouseHandler {
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.selectionManager.setCurrent(screenProps.curCoord);
        screenProps.shapeManager.setShapeInRect(this.prevCoord,this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
    }
    up({screenProps}){
        screenProps.actions.cancel();
    }
}