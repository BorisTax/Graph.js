import { MouseHandler } from "./MouseHandler";
import LineShape from "../components/shapes/LineShape";
import ShapeStyle from "../components/shapes/ShapeStyle";
import AngleShape from "../components/shapes/helpers/AngleShape";
import Geometry, { Vector } from "../utils/geometry";

export class RotateHandler extends MouseHandler {
    constructor(state){
        super(state);
        this.prevAngle=0;
    }
    move({curPoint,screenProps}){
        super.move({curPoint,screenProps});
        this.snap(screenProps);
        screenProps.actions.setCurCoord(this.coord,this.curPoint);
        let angle='';
        const v1=new Vector(this.basePoint,this.baseAxePoint);
        const v2=new Vector(this.basePoint,this.coord);
        const newAngle=Geometry.angleVectors(v1,v2);
        if(this.clickCount>1){
            angle=(newAngle/Math.PI*180).toFixed(2);
        }
        this.statusBar=`${screenProps.captions.transform.rotate.steps[this.clickCount]}  ${angle}`
        if(this.curShape){
            this.curShape.setControlPoint(this.clickCount+1,this.coord);
        }
        if(this.clickCount<2) return;
        for(let s of screenProps.shapes){
            if(s.mockShape){
                s.mockShape.rotate(this.basePoint,newAngle-this.prevAngle);
            }
        }
        this.prevAngle=newAngle;
        this.lastPoint={...this.coord};
    }
    click({curPoint, screenProps}){
        super.click({curPoint,screenProps})
        this.lastPoint={...this.coord};
        switch(this.clickCount){
        case 1:
            this.basePoint={...this.coord}
            this.lastPoint={...this.coord};
            this.curShape=new LineShape({p1:this.basePoint,p2:this.coord});
            this.curShape.setStyle(ShapeStyle.HelperShape);
            break;
        case 2:
            for(let s of screenProps.shapes){
                if(s.getState().selected){
                    s.createMockShape();
                }
                this.baseAxePoint={...this.coord}
                this.curShape=new AngleShape({p1:this.basePoint,p2:this.coord,p3:this.coord});
                this.curShape.setStyle(ShapeStyle.HelperShape);
            }
            break;
        case 3:
            for(let s of screenProps.shapes){
                if(s.getState().selected){
                    s.applyTransform();
                    s.deleteMockShape();
                }
            }
            screenProps.actions.refreshSnapMarkers();
            //screenProps.actions.refreshSelectionManager();
            screenProps.actions.abort();
            break;
        default:
    }
        
    }
}