export default class AbstractSnapMarker {
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