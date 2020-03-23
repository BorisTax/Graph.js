import { MouseHandler } from "./MouseHandler";
import LineShape from "../components/shapes/LineShape";
import ShapeStyle from "../components/shapes/ShapeStyle";

export class RotateHandler extends MouseHandler {
    constructor({point,curScreenPoint}){
        super({point,curScreenPoint});
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
        if(this.curShape)this.curShape.setControlPoint(1,this.coord);
    }
    click({curPoint, screenProps}){
        super.click({curPoint,screenProps})
        this.lastPoint={...this.coord};
        if(this.clickCount===3){
            for(let s of screenProps.shapes){
                if(s.getState().selected){
                    s.applyTransform();
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
            this.curShape=new LineShape({p1:this.basePoint,p2:this.coord});
            this.curShape.setStyle(ShapeStyle.HelperShape);
        }
        
    }
}