import { MouseHandler } from "./MouseHandler";

export class StatusPickHandler extends MouseHandler {
    constructor({point,curScreenPoint,shape,propKey,picker}){
        super({point,curScreenPoint});
        this.shape=shape;
        this.propKey=propKey;
        this.picker=picker;
    }
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        this.picker.setCurrent(this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        const currentStep=screenProps.captions.pickers[this.picker.getName()].steps[this.picker.getCurrentStep()];
        this.statusBar=currentStep;
        this.curShape=null;
        this.curHelperShapes=null;
        this.curShape=this.picker.getShape();
        this.curHelperShapes=this.picker.getHelperShapes();
    }
    click({screenProps}){
        this.picker.setNextPoint(screenProps.curCoord);
                    if(!this.picker.isNext())
                    {
                        this.shape.setProperty({key:this.propKey,value:this.picker.getPickedData().value,type:this.picker.getPickedData().type});
                        screenProps.actions.refreshSnapMarkers();
                        screenProps.actions.abort();
                    }
    }
}