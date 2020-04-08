import {ScreenActions} from "../actions/ScreenActions";
import {ShapeActions}  from '../actions/ShapeActions';
import SelectCursor from "../components/shapes/cursors/SelectCursor";
import Geometry, { Circle, Coord2D, SLine } from "../utils/geometry";
import SelectionManager from "../components/shapes/selection/SelectionManager";
import DrawCursor from "../components/shapes/cursors/DrawCursor";
import SLineShape from "../components/shapes/SLineShape";
import ShapeStyle from "../components/shapes/ShapeStyle";
import SnapMarkersManager from "../components/shapes/markers/SnapMarkersManager";
import SelectionShape from "../components/shapes/selection/SelectionShape";
import SelectRectCreator from "../components/shapes/shapecreators/SelectRectCreator";
import DragCursor from "../components/shapes/cursors/DragCursor";
import MoveCursor from "../components/shapes/cursors/MoveCursor";
import RotateCursor from "../components/shapes/cursors/RotateCursor";
import PickCursor from "../components/shapes/cursors/PickCursor";
import { Color } from "../components/colors";
import { StatusFreeHandler } from "../handlers/StatusFreeHandler";
import { StatusPanHandler } from "../handlers/StatusPanHandler";
import { StatusPickHandler } from "../handlers/StatusPickHandler";
import { StatusSelectHandler } from "../handlers/StatusSelectHandler";
import { StatusCreateHandler } from "../handlers/StatusCreateHandler";
import { MoveHandler } from "../handlers/MoveHandler";
import { AppActions } from "../actions/AppActions";
import { RotateHandler } from "../handlers/RotateHandler";

export const Status={
    FREE:'FREE',
    SELECT:'SELECT',
    CREATE:'CREATE',
    DRAWING:'DRAWING',
    CANCEL:'CANCEL',
    PAN:'PAN',
    PICK:'PICK',
    MOVETRANS:'MOVETRANS',
    ROTATETRANS:'ROTATETRANS',
}
const xAxeShape=new SLineShape(new SLine(0,1,0),new Circle(new Coord2D(0,0),8));
const yAxeShape=new SLineShape(new SLine(1,0,0),new Circle(new Coord2D(0,0),8));
xAxeShape.setStyle(new ShapeStyle(Color.RED,ShapeStyle.SOLID));
yAxeShape.setStyle(new ShapeStyle(Color.RED,ShapeStyle.SOLID));

const initialState = {
    viewPorts:[
        {
            topLeft:{x:-10,y:10},
            bottomRight:{x:10,y:-10},
            viewPortOuterCircle:new Circle({x:0,y:0},20),
            //curRealPoint:{x:0,y:0},
            curCanvasPoint:{x:225,y:225},
            marginTop:15,marginLeft:40,marginBottom:15,marginRight:10,
            gridStep:1,
            gridStepPixels:1,
            ratio:1,pixelRatio:1,
            realWidth:20,realHeight:20,
            viewPortHeight:550,
            viewPortWidth:550,
        },
    ],
    currentProps:[],//properties of the selected shape or active tool shown in the PropertyBar
    //bottomRight:{x:10,y:-10},
    //screenOuterCircle:new Circle({x:0,y:0},20),
    curRealPoint:{x:0,y:0},
    //curScreenPoint:{x:225,y:225},
    cursor:new SelectCursor({x:0,y:0}),
    curShape:null,
    cyclicCreation:false,
    gridSnap:false,
    gridStep:1,
    gridStepPixels:1,
    marginTop:15,marginLeft:40,marginBottom:15,marginRight:10,
    picker:null,
    prevStatus:Status.FREE,
    ratio:1,pixelRatio:1,
    realWidth:20,realHeight:20,
    repaint:0,//random number used to rerender all components when it's changed
    viewPortHeight:550,
    viewPortWidth:550,
    selectedShapes:[],
    selectDist:2,
    selectionShape:new SelectionShape(SelectRectCreator),
    selectionType:'crossSelect',
    shapes:[],
    shapeCreator:null,
    showConfirm:{show:false,message:""},
    selectionManager:new SelectionManager([]),
    show:{grid:true},
    snap:{snapClass:null,snap:false},
    snapDist:20,snapMinDist:10,
    snapMarkersManager:new SnapMarkersManager(),
    status:Status.FREE,
    statusBar:5,
    statusParams:{creator:null,picker:null},
    topLeft:{x:-10,y:10},
    xAxe:xAxeShape,
    yAxe:yAxeShape,
};
//initialState.mouseHandler=new StatusFreeHandler({selectDist:initialState.selectDist,pixelRatio:initialState.pixelRatio});
initialState.mouseHandler=new StatusFreeHandler(initialState);
export function modelReducer(state = initialState,action) {
    const newState={...state}
    var tl,c,br,bc,params,rh,r;
    let handlerOptions={point:state.curRealPoint,screenPoint:state.curScreenPoint,screenProps:state}
    //delete(handlerOptions.mouseHandler);
    switch (action.type) {
        case ScreenActions.ABORT:
            state.shapes.forEach(s=>{
                s.mockShape=null;})
            return {...state,
                status:Status.FREE,
                //activeTransformButton:'',
                curShape:null,
                curHelperShapes:null,
                shapeCreator:null,
                picker:null,
                pickedEditId:"",
                creationStep:"",
                currentShape:"",
                cursor:new SelectCursor(state.curRealPoint),
                mouseHandler:new StatusFreeHandler(state),
                repaint:Math.random()}
        case ScreenActions.ADD_SHAPE:
            state.shapes.push(action.payload);
            return{...state};
        case ScreenActions.CANCEL:
            state.shapes.forEach(s=>{
                s.setState({selected:false,underCursor:false,highlighted:false,inSelection:false});
                s.mockShape=null;})
            state.selectionManager.deselectShapes();
            //for(const s of state.shapes) s.mockShape=null;
            return {...state,
                status:Status.FREE,
                activeTransformButton:'',
                curShape:null,
                curHelperShapes:null,
                shapeCreator:null,
                picker:null,
                pickedEditId:"",
                creationStep:"",
                currentShape:"",
                currentProps:[],
                cursor:new SelectCursor(state.curRealPoint),
                mouseHandler:new StatusFreeHandler(state),
                repaint:Math.random()}
        case ScreenActions.CANCEL_SELECTION:
            state.shapes.forEach(s=>s.setState({selected:false,underCursor:false,highlighted:false,inSelection:false}))
            return {...state,
                status:Status.FREE,
                activeTransformButton:'',
                selectedShapes:[],
                curShape:null,
                curHelperShapes:null,
                shapeCreator:null,
                picker:null,
                pickedEditId:"",
                creationStep:"",
                currentShape:"",
                currentProps:[],
                cursor:new SelectCursor(state.curRealPoint),
                repaint:Math.random()}
        case ScreenActions.CENTER_TO_POINT:
            var point=action.payload;
            let viewPortWidth=state.realWidth-(state.marginLeft+state.marginRight)*state.pixelRatio;
            let viewPortHeight=state.realHeight-(state.marginTop+state.marginBottom)*state.pixelRatio;
            //new topLeft
            tl={x:point.x-viewPortWidth/2-state.marginLeft*state.pixelRatio,y:point.y+viewPortHeight/2+state.marginTop*state.pixelRatio}
            br={}
            br.x=tl.x+state.realWidth;
            br.y=tl.y-state.realHeight;        
            //new screenOuterCircle
            c=Geometry.screenToReal(state.viewPortWidth/2,state.viewPortHeight/2,state.viewPortWidth,state.viewPortHeight,tl,br);
            r=Math.sqrt(state.realWidth*state.realWidth+state.realHeight*state.realHeight)/2;
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            return{...state,topLeft:tl,bottomRight:br};
        case ScreenActions.CREATE_SHAPE:
            return{...state,
                status:Status.CREATE,
                shapeCreator:action.payload,
                curShape:null,
                curHelperShapes:null,
                cursor:new DrawCursor(state.curRealPoint),
                mouseHandler:new StatusCreateHandler(state)
            };
        case ScreenActions.DELETE_CONFIRM:
            if(state.shapes.some(s=>s.state.selected)) newState.showConfirm={show:true,messageKey:"deleteShapes",okAction:ScreenActions.deleteSelectedShapes.bind(null,false)}
            return{...newState}
        case ScreenActions.DELETE_SELECTED_SHAPES:
            return{...state,
                shapes:state.shapes.filter((s)=>!s.getState().selected),
                selectedShapes:[],
                mouseHandler:new StatusFreeHandler(state),
                cursor: new SelectCursor()
            };
        case ScreenActions.PAN_SCREEN:
            return {
                ...state,
                status:Status.PAN,
                prevStatus:state.status,
                prevCursor:state.cursor,
                prevMouseHandler:state.mouseHandler,
                cursor:new DragCursor(state.curRealPoint),
                mouseHandler:new StatusPanHandler(state)
            }
        case ScreenActions.PICK_PROPERTY:
            return {...state,
                status:Status.PICK,
                pickedEditId:action.payload.index,
                cursor:new PickCursor(state.curRealPoint),
                mouseHandler:new StatusPickHandler({state,
                    properties:action.payload.properties,
                    index:action.payload.index,
                    picker:action.payload.picker,
                })
            }
        case ScreenActions.REFRESH_SNAP_MARKERS:
            state.snapMarkersManager.clear();
            for(let s of state.shapes){
                state.snapMarkersManager.addSnapMarkers(s.getMarkers());
            }
            return {...state}
        case ScreenActions.REFRESH_SELECTION_MANAGER:
                state.selectionManager=new SelectionManager(state.shapes);
                return {...state}
        case ScreenActions.REPAINT:
            return {...state,repaint:Math.random()}
        case ScreenActions.SELECT_ALL:
            var selectedShapes=[];
            state.shapes.forEach((s,i)=>{
                            if(i>1){
                                   s.setState({selected:true});
                                   selectedShapes.push(s);
                                }});
            return{...state,selectedShapes};
        case ScreenActions.SELECT_SHAPE:
            return{...state,selectedShapes:action.payload};
        case ScreenActions.SET_BOUNDED_CIRCLE:
            c=Geometry.screenToReal(state.viewPortWidth/2,state.viewPortHeight/2,state.viewPortWidth,state.viewPortHeight,state.topLeft,state.bottomRight);
            r=Math.sqrt(state.realWidth*state.realWidth+state.realHeight*state.realHeight)/2;
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            return{...state,screenOuterCircle:bc}
        case ScreenActions.SET_CURRENT_PROPS:
            return {...state,currentProps:action.payload}
        case ScreenActions.SET_DIMENSIONS:
            params=action.payload;
            rh=params.height*params.realWidth/params.width
            return {...state,
                viewPortWidth:params.width,
                viewPortHeight:params.height,
                realWidth:params.realWidth,
                ratio:params.width/params.height,
                pixelRatio:params.realWidth/state.viewPortWidth,
                realHeight:rh,
                bottomRight:{x:state.topLeft.x+params.realWidth,y:state.topLeft.y-rh}
            }
        case ScreenActions.SET_CUR_COORD:
            return {...state,curRealPoint:{...action.payload.point},curScreenPoint:{...action.payload.screenPoint}}
        case ScreenActions.SET_CYCLIC_FLAG:
            return {...state,cyclicCreation:action.payload}
        case ScreenActions.SET_GRID_SNAP:
            return{...state,gridSnap:action.payload};
        case ScreenActions.SET_GRID_VISIBLE:
            return{...state,show:{grid:action.payload}};
        case AppActions.SHOW_CONFIRM:
            return {...state,showConfirm:action.payload};  

        case ScreenActions.START_SELECTION:
            return {...state,
                status:Status.SELECT,
                mouseHandler:new StatusSelectHandler(state)
            }
        case ScreenActions.SET_PREV_COORD:
            return {...state,prevCoord:{...action.payload.point},prevScreenPoint:{...action.payload.screenPoint}}
        case ScreenActions.SET_PREV_STATUS:
            return {...state,
                status:state.prevStatus,
                cursor:state.prevCursor,
                mouseHandler:state.prevMouseHandler
            }
        case ShapeActions.SET_PROPERTY:
            for(let shape of state.selectedShapes){
               shape.setProperty({...action.payload});
            }
            return{...state}
        case ScreenActions.SET_RATIO:
            return {...state,ratio:action.payload}
        case ScreenActions.SET_REAL_WIDTH:
            var width=action.payload;
            params=getRealWidthParams(width,state.viewPortWidth,state.viewPortHeight,state.topLeft,state.gridStep)
            params.gridStepPixels=Math.round(params.gridStep/params.pixelRatio);
            return {...state,...params}
        case ScreenActions.SET_SCALE:
            const {scale,anchor}=action.payload;
            tl=state.topLeft;
            let dx=anchor.x-tl.x;
            let dy=anchor.y-tl.y;
            //getting new realHeight,pixelRatio,gridStepPixels,bottomRight
            params=getRealWidthParams(state.realWidth*scale,state.viewPortWidth,state.viewPortHeight,tl,state.gridStep)
            dx=dx*scale;
            dy=dy*scale;
            //new topLeft
            tl={x:anchor.x-dx,y:anchor.y-dy}
            br={}
            br.x=tl.x+params.realWidth;
            br.y=tl.y-params.realHeight;
            //new screenOuterCircle
            c=Geometry.screenToReal(state.viewPortWidth/2,state.viewPortHeight/2,state.viewPortWidth,state.viewPortHeight,tl,br);
            r=Math.sqrt(params.realWidth*params.realWidth+params.realHeight*params.realHeight)/2;
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            //new gridStep
            if(params.gridStep/params.pixelRatio<10){
                if (params.gridStep<1000000) params.gridStep=params.gridStep*10;
                }
                else if(params.gridStep/params.pixelRatio>100)
                    if(params.gridStep>0.001) params.gridStep=params.gridStep/10;
                            params.gridStepPixels=Math.round(params.gridStep/params.pixelRatio);
            var pr=params.realWidth/state.viewPortWidth;
            return {...state,...params,topLeft:tl,bottomRight:br,screenOuterCircle:bc,pixelRatio:pr}
        case ScreenActions.SET_SCREEN_CONTEXT:
            return{...state,context:action.payload};
        case ScreenActions.SET_SELECTION_TYPE:
            return {...state,selectionType:action.payload}
        case ScreenActions.SET_SNAP:
                if(action.payload.snap===true)state.snapMarkersManager.addSnap(action.payload.snapClass)
                 else state.snapMarkersManager.removeSnap(action.payload.snapClass)
            return{...state};
        case ScreenActions.SET_STATUS:
            return{...state,
                status:action.payload.status,
                prevStatus:action.payload.status,
                statusParams:action.payload.params};
        case ScreenActions.SET_TOP_LEFT:
            var topLeft=action.payload;
            var bottomRight={};
            bottomRight.x=topLeft.x+state.realWidth;
            bottomRight.y=topLeft.y-state.realHeight;
            //screenOuterCircle
            c=Geometry.midPoint(topLeft,bottomRight);
            r=Geometry.distance(topLeft,c);
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            return {...state,topLeft,bottomRight,screenOuterCircle:bc}
        case ScreenActions.TRANS_MOVE:
            return{...state,
                mouseHandler:new MoveHandler(state),
                activeTransformButton:'move',
                cursor: new MoveCursor()
            };
        case ScreenActions.TRANS_ROTATE:
            return{...state,
                mouseHandler:new RotateHandler(state),
                activeTransformButton:'rotate',
                cursor: new RotateCursor()
            };
        default:
            return state
    }
}

function getRealWidthParams(realWidth,viewPortWidth,viewPortHeight,topLeft,gridStep){
    const pr=realWidth/viewPortWidth;
    const rh=viewPortHeight*pr;
    const gsp=Math.round(gridStep/pr);
    const br={};
    br.x=topLeft.x+realWidth;
    br.y=topLeft.y-rh;
    return {
        realWidth:realWidth,
        realHeight:rh,
        pixelRatio:pr,
        gridStepPixels:gsp,
        bottomRight:br,
        gridStep
    }
}