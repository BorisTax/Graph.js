import { MouseHandler } from "./MouseHandler";

export class StatusCreateHandler extends MouseHandler {

    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        //if(screenProps.shapeCreator)
        screenProps.shapeCreator.setCurrent(this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        this.currentShape=screenProps.captions.creators[screenProps.shapeCreator.getName()].description;
        this.creationStep=screenProps.captions.creators[screenProps.shapeCreator.getName()].steps[screenProps.shapeCreator.getCurrentStep()];
        this.statusBar=`${this.currentShape}: ${this.creationStep}`;
        this.curHelperShapes=null;
        this.curHelperShapes=screenProps.shapeCreator.getHelperShapes();
        this.curShape=null;
        this.curShape=screenProps.shapeCreator.getShape();
    }
    click({screenProps}){
        screenProps.shapeCreator.setCurrent(screenProps.curRealPoint);
        if(screenProps.shapeCreator.isLegal()) screenProps.shapeCreator.setNextPoint(screenProps.curRealPoint);
        if(!screenProps.shapeCreator.isNext()){
            //screenProps.shapes.push(screenProps.shapeCreator.getShape());
            screenProps.actions.addShape(screenProps.shapeCreator.getShape());
            screenProps.actions.refreshSnapMarkers();
            screenProps.actions.refreshSelectionManager();
            if(screenProps.cyclicCreation){
                screenProps.actions.createShape(screenProps.shapeCreator.reset(screenProps.screenOuterCircle));
            }else {
                screenProps.actions.cancel();
            }
        }
        this.creationStep=screenProps.captions.creators[screenProps.shapeCreator.getName()].steps[screenProps.shapeCreator.getCurrentStep()];
        this.statusBar=`${this.currentShape}: ${this.creationStep}`;
    }
}