import { MouseHandler } from "./MouseHandler";

export class StatusPickHandler extends MouseHandler {
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.picker.setCurrent(this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
    }
    click({screenProps}){
        screenProps.picker.setNextPoint(screenProps.curCoord);
                    if(!screenProps.picker.isNext())
                    {
                        screenProps.actions.setPickedData(screenProps.picker.getPickedData());
                        screenProps.actions.refreshSnapMarkers();
                        screenProps.actions.refreshShapeManager();
                    }
    }
}