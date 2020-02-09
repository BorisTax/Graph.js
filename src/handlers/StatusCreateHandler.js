import { MouseHandler } from "./MouseHandler";

export class StatusCreateHandler extends MouseHandler {
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.shapeCreator.setCurrent(this.coord);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
    }
    click({screenProps}){
        screenProps.shapeCreator.setCurrent(screenProps.curCoord);
        if(screenProps.shapeCreator.isLegal()) screenProps.shapeCreator.setNextPoint(screenProps.curCoord);
        if(!screenProps.shapeCreator.isNext())
        {
            //screenProps.shapes.push(screenProps.shapeCreator.getShape());
            screenProps.actions.addShape(screenProps.shapeCreator.getShape());
            screenProps.actions.refreshSnapMarkers();
            screenProps.actions.refreshShapeManager();
            if(screenProps.cyclicCreation){
                screenProps.actions.createShape(screenProps.shapeCreator.reset(screenProps.boundedCircle));
            }else {
                screenProps.actions.cancel();
            }
        }
    }
}