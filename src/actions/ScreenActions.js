import { Status } from "../reducers/screen";
export const ScreenActions = {
  ABORT:'ABORT',
  ADD_SHAPE: "ADD_SHAPE",
  CANCEL: "CANCEL",
  CANCEL_SELECTION: "CANCEL_SELECTION",
  CENTER_TO_POINT: "CENTER_TO_POINT",
  CREATE_SHAPE: "CREATE_SHAPE",
  DELETE_CONFIRM: "DELETE_CONFIRM",
  DELETE_SELECTED_SHAPES: "DELETE_SELECTED_SHAPES",
  PAN_SCREEN: "PAN_SCREEN",
  PICK: "PICK",
  PICK_PROPERTY: "PICK_PROPERTY",
  REFRESH_SELECTION_MANAGER: "REFRESH_SELECTION_MANAGER",
  REFRESH_SNAP_MARKERS: "REFRESH_SNAP_MARKERS",
  REPAINT: "REPAINT",
  SELECT_ALL: "SELECT_ALL",
  SELECT_SHAPE: "SELECT_SHAPE",
  SET_BOUNDED_CIRCLE: "SET_BOUNDED_CIRCLE",
  SET_CUR_COORD: "SET_CUR_COORD",
  SET_CYCLIC_FLAG: "SET_CYCLIC_FLAG",
  SET_DIMENSIONS: "SET_DIMENSIONS",
  SET_GRID_SNAP: "SET_GRID_SNAP",
  SET_GRID_VISIBLE: "SET_GRID_VISIBLE",
  SET_PREV_COORD: "SET_PREV_COORD",
  SET_PREV_STATUS: "SET_PREV_STATUS",
  SET_RATIO: "SET_RATIO",
  SET_REAL_WIDTH: "SET_REAL_WIDTH",
  SET_SCALE: "SET_SCALE",
  SET_SCREEN_CONTEXT: "SET_SCREEN_CONTEXT",
  SET_SELECTION_TYPE: "SET_SELECTION_TYPE",
  SET_SNAP: "SET_SNAP",
  SET_STATUS: "SET_STATUS",
  SET_TOP_LEFT: "SET_TOP_LEFT",
  START_SELECTION: "START_SELECTION",
  TRANS_MOVE:"TRANS_MOVE",
  TRANS_ROTATE:"TRANS_ROTATE",
  abort: () => {
    return {
      type: ScreenActions.ABORT,
    };
  },
  addShape: shape => {
    return {
      type: ScreenActions.ADD_SHAPE,
      payload: shape
    };
  },
  cancel: () => {
    return {
      type: ScreenActions.CANCEL
    };
  },
  cancelSelection: () => {
    return {
      type: ScreenActions.CANCEL_SELECTION
    };
  },
  centerToPoint: p => {
    return {
      type: ScreenActions.CENTER_TO_POINT,
      payload: p
    };
  },
  createNewShape: creator => {
    return {
      type: ScreenActions.CREATE_SHAPE,
      payload: creator
    };
  },
  deleteConfirm: () => {
    return {
      type: ScreenActions.DELETE_CONFIRM
    };
  },
  deleteSelectedShapes: () => {
    return {
      type: ScreenActions.DELETE_SELECTED_SHAPES
    };
  },
  pickProperty: (id, shape, propKey, picker) => {
    return {
      type: ScreenActions.PICK_PROPERTY,
      payload: { id, shape, propKey, picker }
    };
  },
  refreshSelectionManager: () => {
    return {
      type: ScreenActions.REFRESH_SELECTION_MANAGER
    };
  },
  refreshSnapMarkers: () => {
    return {
      type: ScreenActions.REFRESH_SNAP_MARKERS
    };
  },
  repaint: () => {
    return {
      type: ScreenActions.REPAINT
    };
  },
  selectAll: () => {
    return {
      type: ScreenActions.SELECT_ALL
    };
  },
  selectShapes: selectedShapes => {
    return {
      type: ScreenActions.SELECT_SHAPE,
      payload: selectedShapes
    };
  },
  setBoundedCircle: () => {
    return {
      type: ScreenActions.SET_BOUNDED_CIRCLE
    };
  },
  setCurCoord: (point, screenPoint) => {
    return {
      type: ScreenActions.SET_CUR_COORD,
      payload: { point, screenPoint }
    };
  },
  setCyclicFlag: flag => {
    return {
      type: ScreenActions.SET_CYCLIC_FLAG,
      payload: flag
    };
  },
  setDimensions: (width, height, realWidth, topLeft) => {
    return {
      type: ScreenActions.SET_DIMENSIONS,
      payload: { width, height, realWidth, topLeft }
    };
  },
  setGridSnap: snap => {
    return {
      type: ScreenActions.SET_GRID_SNAP,
      payload: snap
    };
  },
  setGridVisible: visible => {
    return {
      type: ScreenActions.SET_GRID_VISIBLE,
      payload: visible
    };
  },
  setPickedData: data => {
    return {
      type: ScreenActions.SET_PICKED_DATA,
      payload: data
    };
  },
  setPrevCoord: (point, screenPoint) => {
    return {
      type: ScreenActions.SET_PREV_COORD,
      payload: { point, screenPoint }
    };
  },
  setPrevStatus: () => {
    return {
      type: ScreenActions.SET_PREV_STATUS
    };
  },
  setRatio: ratio => {
    return {
      type: ScreenActions.SET_RATIO,
      payload: ratio
    };
  },
  setRealWidth: width => {
    return {
      type: ScreenActions.SET_REAL_WIDTH,
      payload: width
    };
  },
  setScale: (scale, anchor) => {
    return {
      type: ScreenActions.SET_SCALE,
      payload: { scale, anchor }
    };
  },
  setScreenContext: context => {
    return {
      type: ScreenActions.SET_SCREEN_CONTEXT,
      payload: context
    };
  },
  setScreenStatus: (status = Status.FREE, params) => {
    let payload = null;
    let type = null;
    switch (status) {
      case Status.SELECT:
        type = ScreenActions.START_SELECTION;
        break;
      case Status.CREATE:
        type = ScreenActions.CREATE_SHAPE;
        payload = { creator: params.creator };
        break;
      case Status.CANCEL:
        type = ScreenActions.CANCEL;
        break;
      case Status.PAN:
        type = ScreenActions.PAN_SCREEN;
        break;
      case Status.PICK:
        type = ScreenActions.PICK;
        payload = { picker: params.picker };
        break;
      case Status.MOVETRANS:
        type = ScreenActions.TRANS_MOVE;
        //payload = { picker: params.picker };
        break;
      case Status.ROTATETRANS:
        type = ScreenActions.TRANS_ROTATE;
        //payload = { picker: params.picker };
        break;
      default:
    }
    return {
      type,
      payload
    };
  },
  setSelectionType: selType => {
    return {
      type: ScreenActions.SET_SELECTION_TYPE,
      payload: selType
    };
  },
  setSnap: (snapClass, snap) => {
    const type =
      snapClass === "grid"
        ? ScreenActions.SET_GRID_SNAP
        : ScreenActions.SET_SNAP;
    const payload =
      snapClass === "grid" ? snap : { snapClass: snapClass, snap: snap };
    return {
      type: type,
      payload: payload
    };
  },
  setTopLeft: p => {
    return {
      type: ScreenActions.SET_TOP_LEFT,
      payload: p
    };
  },

};
