import { MouseHandler } from "./MouseHandler";
import Geometry from "../utils/geometry";
import { Status } from "../reducers/model";

export class StatusFreeHandler extends MouseHandler {
    constructor(state){
        super(state);
        this.getSelectedShapeProperties(state);
    }
    move({curPoint,screenProps,shiftKey,altKey}){
        super.move({curPoint,screenProps});
        screenProps.cursor.setAdditional({shiftKey,altKey});
        screenProps.selectionManager.findShapeNearPoint(this.coord,screenProps.selectDist*screenProps.pixelRatio, altKey);
        screenProps.selectionManager.findControlPoints(this.coord,screenProps.selectDist*screenProps.pixelRatio);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        this.statusBar='';
    }
    down({curPoint,screenProps}){
        this.curPoint={...curPoint};
        this.prevCoord=Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.viewPortWidth,screenProps.viewPortHeight,screenProps.topLeft,screenProps.bottomRight);
        screenProps.selectionShape.reset();
        screenProps.selectionShape.setNext(Geometry.screenToReal(this.curPoint.x,this.curPoint.y,screenProps.viewPortWidth,screenProps.viewPortHeight,screenProps.topLeft,screenProps.bottomRight));
        screenProps.actions.setScreenStatus(Status.SELECT);
        screenProps.actions.setPrevCoord(this.prevCoord,this.curPoint);
    }
    click({screenProps,shiftKey,altKey}){
        //screenProps.selectionManager.findShapeNearPoint(this.coord,screenProps.selectDist*screenProps.pixelRatio, altKey);
        
        screenProps.selectionManager.selectShapes({shiftKey,altKey});
        screenProps.selectionManager.selectControlPoints(shiftKey,altKey);
        this.getSelectedShapeProperties(screenProps);
    }
    getSelectedShapeProperties(state){
        this.properties=[];
        const shape=state.selectionManager.getSelectedShapes().pop();
        if(shape){
            const props=shape.getProperties();
            this.setProperties(props);
        }
    }
    getCaptionsKey(){
        return "shapes";
    }
}