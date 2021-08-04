import { MouseHandler } from "./MouseHandler";
import DistanceShape from "../components/shapes/helpers/DistanceShape";
import { PropertyTypes } from "../components/shapes/PropertyData";

export class MoveHandler extends MouseHandler {
    constructor(state){
        super(state);
        this.properties=[
            {type:PropertyTypes.BOOL,value:false,labelKey:"make_copy",setValue:(value)=>{this.makeCopy=value;}},
        ]
    }
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        let delta='';
        if(this.clickCount>0){
            const dx=this.coord.x-this.basePoint.x;
            const dy=this.coord.y-this.basePoint.y;
            delta=`(dx=${dx.toFixed(3)} dy=${dy.toFixed(3)})`;
        }
        this.statusBar=`${screenProps.captions.transform.move.steps[this.clickCount]}  ${delta}`
        if(this.clickCount===0) return;
        const x=this.coord.x-this.lastPoint.x;
        const y=this.coord.y-this.lastPoint.y;
        for(let s of screenProps.shapes){
            if(s.mockShape){
                s.mockShape.move({x,y});
            }
        this.lastPoint={...this.coord};
        }
        if(this.curShape)this.curShape.setControlPoint(2,this.coord);
    }
    click({curPoint, screenProps}){
        super.click({curPoint,screenProps})
        this.lastPoint={...this.coord};
        if(this.clickCount===2){
            for(let s of screenProps.shapes){
                if(s.getState().selected){
                    if(this.makeCopy){
                        const newShape=s.copyShape();
                        newShape.mockShape=s.mockShape;
                        newShape.applyTransform();
                        newShape.deleteMockShape();
                        screenProps.actions.addShape(newShape);
                    }else{
                        s.applyTransform();
                    }
                    s.deleteMockShape();
                }
            }
            screenProps.actions.refreshSnapMarkers();
            //screenProps.actions.refreshSelectionManager();
            screenProps.actions.abort();
        }else
        for(let s of screenProps.shapes){
            if(s.getState().selected){
                s.createMockShape();
            }
            this.basePoint={...this.coord}
            this.curShape=new DistanceShape({p1:this.basePoint,p2:this.coord});
            //this.curShape.setStyle(ShapeStyle.HelperShape);
        }
        
    }
    getCaptionsKey(){
        return "transform";
    }
}