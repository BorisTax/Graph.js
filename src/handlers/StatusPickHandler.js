import { MouseHandler } from "./MouseHandler";

export class StatusPickHandler extends MouseHandler {
    constructor({state,object,properties,index,picker}){
        super(state);
        this.currentObject=object;
        this.properties=properties;
        this.index=index;
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
        this.picker.setNextPoint(screenProps.curRealPoint);
                    if(!this.picker.isNext())
                    {
                        //this.shape.setProperty({key:this.propKey,value:this.picker.getPickedData().value,type:this.picker.getPickedData().type});
                        this.properties[this.index].setValue(this.picker.getPickedData().value);
                        screenProps.actions.refreshSnapMarkers();
                        screenProps.actions.abort();
                    }
    }
    getCaptionsKey(){
        return "shapes";
    }
}