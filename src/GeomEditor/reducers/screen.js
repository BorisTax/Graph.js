import {SET_GRID_VISIBLE,SET_GRID_SNAP,SET_SNAP,SET_SCREEN_CONTEXT,CREATE_SHAPE, SET_SELECTION_TYPE, SET_TOP_LEFT, SET_PICKED_DATA, START_PICKING, REPAINT, CANCEL, SET_BOUNDED_CIRCLE, REFRESH_SNAP_MARKERS, REFRESH_SHAPE_MANAGER, SET_REAL_WIDTH, SET_SCALE, SET_DIMENSIONS, SET_CUR_COORD, SET_RATIO, PAN_SCREEN, SET_PREV_STATUS, START_SELECTION, CANCEL_SELECTION} from "../actions/ScreenActions";
import {SELECT_SHAPE,DELETE_SELECTED_SHAPES,SET_STATUS, ADD_SHAPE, CENTER_TO_POINT, SELECT_ALL} from "../actions/ScreenActions";
import {SET_CYCLIC_FLAG} from "../actions/ScreenActions";
import {SET_PROPERTY}  from '../actions/ShapeActions';
import FreeCursor from "../components/shapes/cursors/FreeCursor";
import Geometry, { Circle, Coord2D, SLine } from "../utils/geometry";
import ShapeManager from "../components/shapes/ShapeManager";
import DrawCursor from "../components/shapes/cursors/DrawCursor";
import SLineShape from "../components/shapes/SLineShape";
import ShapeStyle from "../components/shapes/ShapeStyle";
import SnapMarkersManager from "../components/shapes/markers/SnapMarkersManager";
import SelectionManager from "../components/shapes/SelectionManager";
import SelectRectCreator from "../components/shapes/shapecreators/SelectRectCreator";
import DragCursor from "../components/shapes/cursors/DragCursor";
export const STATUS_FREE='FREE';
export const STATUS_SELECT='SELECT';
export const STATUS_CREATE='CREATE';
export const STATUS_DRAWING='DRAWING';
export const STATUS_CANCEL='CANCEL';
export const STATUS_PAN='PAN';
export const STATUS_PICK='PICK';
export const STATUS_PICK_END='PICK_END';
const xAxeShape=new SLineShape(new SLine(0,1,0),new Circle(new Coord2D(0,0),8));
const yAxeShape=new SLineShape(new SLine(1,0,0),new Circle(new Coord2D(0,0),8));
xAxeShape.setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
yAxeShape.setStyle(new ShapeStyle("red",ShapeStyle.SOLID));
const initialState = {
    bottomRight:{x:10,y:-10},
    curCoord:{x:0,y:0},
    cursor:new FreeCursor({x:0,y:0}),
    curShape:null,
    cyclicCreation:false,
    gridSnap:false,
    gridStep:1,
    gridStepPixels:1,
    marginTop:15,marginLeft:40,marginBottom:15,marginRight:10,
    pickedData:{data:null,editId:0,fix:false},
    picker:null,
    prevStatus:STATUS_FREE,
    ratio:1,pixelRatio:1,
    realWidth:20,realHeight:20,
    repaint:0,//random number is used to rerender all components when it's changed
    screenHeight:550,
    screenWidth:550,
    selectedShapes:[],
    selectDist:2,
    selectionManager:new SelectionManager(SelectRectCreator),
    selectionType:'crossSelect',
    shapes:[xAxeShape,yAxeShape],
    shapeCreator:null,
    shapeManager:new ShapeManager(),
    show:{grid:true},
    snap:{snapClass:null,snap:false},
    snapDist:20,snapMinDist:10,
    snapMarkersManager:new SnapMarkersManager(),
    status:STATUS_FREE,
    statusBar:5,
    statusParams:{creator:null,picker:null},
    topLeft:{x:-10,y:10},
    
};
export function screenReducer(state = initialState,action) {
    var tl,c,br,bc,params,rh,r;
    switch (action.type) {
        case ADD_SHAPE:
            state.shapes.push(action.payload);
            return{...state};
        case CANCEL:
            return {...state,
                status:STATUS_FREE,
                curShape:null,
                curHelperShapes:null,
                shapeCreator:null,
                picker:null,
                creationStep:"",
                currentShape:"",
                cursor:new FreeCursor(state.curCoord),
                repaint:Math.random()}
        case CANCEL_SELECTION:
            state.shapes.forEach(s=>s.setState({selected:false}))
            return {...state,
                status:STATUS_FREE,
                curShape:null,
                curHelperShapes:null,
                shapeCreator:null,
                picker:null,
                creationStep:"",
                currentShape:"",
                cursor:new FreeCursor(state.curCoord),
                repaint:Math.random()}
        case CENTER_TO_POINT:
            var point=action.payload;
            let viewPortWidth=state.realWidth-(state.marginLeft+state.marginRight)*state.pixelRatio;
            let viewPortHeight=state.realHeight-(state.marginTop+state.marginBottom)*state.pixelRatio;
            //new topLeft
            tl={x:point.x-viewPortWidth/2-state.marginLeft*state.pixelRatio,y:point.y+viewPortHeight/2+state.marginTop*state.pixelRatio}
            br={}
            br.x=tl.x+state.realWidth;
            br.y=tl.y-state.realHeight;        
            //new boundedCircle
            c=Geometry.screenToReal(state.screenWidth/2,state.screenHeight/2,state.screenWidth,state.screenHeight,tl,br);
            r=Math.sqrt(state.realWidth*state.realWidth+state.realHeight*state.realHeight)/2;
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            return{...state,topLeft:tl,bottomRight:br};
        case CREATE_SHAPE:
            return{...state,
                status:STATUS_CREATE,
                shapeCreator:action.payload,
                curShape:null,
                curHelperShapes:null,
                cursor:new DrawCursor(state.curCoord)
            };
        case DELETE_SELECTED_SHAPES:
            return{...state,shapes:state.shapes.filter((s)=>!s.getState().selected),selectedShapes:[]};
        case PAN_SCREEN:
            return {
                ...state,
                status:STATUS_PAN,
                prevStatus:state.status,
                prevCursor:state.cursor,
                cursor:new DragCursor(state.curCoord)
            }
        case REFRESH_SNAP_MARKERS:
            state.snapMarkersManager.clear();
            for(let s of state.shapes){
                state.snapMarkersManager.addSnapMarkers(s.getMarkers());
            }
            return {...state}
        case REFRESH_SHAPE_MANAGER:
                state.shapeManager=new ShapeManager(state.shapes);
                return {...state}
        case REPAINT:
            return {...state,repaint:Math.random()}
        case SELECT_ALL:
            var selectedShapes=[];
            state.shapes.forEach((s,i)=>{
                            if(i>1){
                                   s.setState({selected:true});
                                   selectedShapes.push(s);
                                }});
            return{...state,selectedShapes};
        case SELECT_SHAPE:
            return{...state,selectedShapes:action.payload};
        case SET_BOUNDED_CIRCLE:
            c=Geometry.screenToReal(state.screenWidth/2,state.screenHeight/2,state.screenWidth,state.screenHeight,state.topLeft,state.bottomRight);
            r=Math.sqrt(state.realWidth*state.realWidth+state.realHeight*state.realHeight)/2;
            bc=new Circle(c,r);
            if(state.shapeCreator!=null) state.shapeCreator.refresh(bc);
            return{...state,boundedCircle:bc}
        case SET_DIMENSIONS:
            params=action.payload;
            rh=params.height*params.realWidth/params.width
            return {...state,
                screenWidth:params.width,
                screenHeight:params.height,
                realWidth:params.realWidth,
                ratio:params.width/params.height,
                pixelRatio:params.realWidth/state.screenWidth,
                realHeight:rh,
                bottomRight:{x:state.topLeft.x+params.realWidth,y:state.topLeft.y-rh}
            }
        case SET_CUR_COORD:
            return {...state,curCoord:action.payload}
        case SET_CYCLIC_FLAG:
            return {...state,cyclicCreation:action.payload}
        case SET_GRID_SNAP:
            return{...state,gridSnap:action.payload};
        case SET_GRID_VISIBLE:
            return{...state,show:{grid:action.payload}};
        case START_PICKING:
            return {...state,status:STATUS_PICK,pickedData:{data:state.pickedData.data,editId:action.payload.id},picker:action.payload.picker}
        case START_SELECTION:
            return {...state,status:STATUS_SELECT}
        case SET_PICKED_DATA:
            return {...state,status:STATUS_PICK_END,pickedData:{data:action.payload,editId:state.pickedData.editId}}
        case SET_PREV_STATUS:
            return {...state,status:state.prevStatus,cursor:state.prevCursor}
        case SET_PROPERTY:
            for(let shape of state.selectedShapes){
               if(shape.getProperties().has(action.payload.key)) shape.setProperty({key:action.payload.key,value:action.payload.value});
            }
            return{...state}
        case SET_RATIO:
            return {...state,ratio:action.payload}
        case SET_REAL_WIDTH:
            var width=action.payload;
            params=getRealWidthParams(width,state.screenWidth,state.screenHeight,state.topLeft,state.gridStep)
            params.gridStepPixels=Math.round(params.gridStep/params.pixelRatio);
            return {...state,...params}
        case SET_SCALE:
            const {scale,anchor}=action.payload;
            tl=state.topLeft;
            let dx=anchor.x-tl.x;
            let dy=anchor.y-tl.y;
            //getting new realHeight,pixelRatio,gridStepPixels,bottomRight
            params=getRealWidthParams(state.realWidth*scale,state.screenWidth,state.screenHeight,tl,state.gridStep)
            dx=dx*scale;
            dy=dy*scale;
            //new topLeft
            tl={x:anchor.x-dx,y:anchor.y-dy}
            br={}
            br.x=tl.x+params.realWidth;
            br.y=tl.y-params.realHeight;
            //new boundedCircle
            c=Geometry.screenToReal(state.screenWidth/2,state.screenHeight/2,state.screenWidth,state.screenHeight,tl,br);
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
            var pr=params.realWidth/state.screenWidth;
            return {...state,...params,topLeft:tl,bottomRight:br,boundedCicle:bc,pixelRatio:pr}
        case SET_SCREEN_CONTEXT:
            return{...state,context:action.payload};
        case SET_SELECTION_TYPE:
            return {...state,selectionType:action.payload}
        case SET_SNAP:
                if(action.payload.snap===true)state.snapMarkersManager.addSnap(action.payload.snapClass)
                 else state.snapMarkersManager.removeSnap(action.payload.snapClass)
            return{...state};
        case SET_STATUS:
            return{...state,
                status:action.payload.status,
                prevStatus:action.payload.status,
                statusParams:action.payload.params};
        case SET_TOP_LEFT:
            var topLeft=action.payload;
            var bottomRight={};
            bottomRight.x=topLeft.x+state.realWidth;
            bottomRight.y=topLeft.y-state.realHeight;
            return {...state,topLeft,bottomRight}
        default:
            return state
    }
}

function getRealWidthParams(realWidth,screenWidth,screenHeight,topLeft,gridStep){
    const pr=realWidth/screenWidth;
    const rh=screenHeight*pr;
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