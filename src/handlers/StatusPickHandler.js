import { MouseHandler } from "./MouseHandler";

export class StatusPickHandler extends MouseHandler {
    constructor({point,curScreenPoint}){
        super({point,curScreenPoint});
    }
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.picker.setCurrent(this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        const currentStep=screenProps.captions.pickers[screenProps.picker.getName()].steps[screenProps.picker.getCurrentStep()];
        this.statusBar=currentStep;
        this.curShape=null;
        this.curHelperShapes=null;
        this.curShape=screenProps.picker.getShape();
        this.curHelperShapes=screenProps.picker.getHelperShapes();
    }
    click({screenProps}){
        screenProps.picker.setNextPoint(screenProps.curCoord);
                    if(!screenProps.picker.isNext())
                    {
                        screenProps.actions.setPickedData(screenProps.picker.getPickedData());
                        screenProps.actions.refreshSnapMarkers();
                        screenProps.actions.refreshSelectionManager();
                    }
    }
}