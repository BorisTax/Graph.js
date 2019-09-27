export default class SnapMarker {
    static MARKER_SIZE=5;
    static SNAP_MARKER_SIZE=5; 
    constructor(pos){
        this.pos=pos;

    }
    getMarker(){
        return this.markerShape;
    }
    getPos(){
        return this.pos;
    }
    setMarker(pos, markerShape){
    this.pos=pos;
    this.markerShape=markerShape;
    }
    refresh(realRect, screenRect){
    this.markerShape.refresh(realRect,screenRect);
    }
}