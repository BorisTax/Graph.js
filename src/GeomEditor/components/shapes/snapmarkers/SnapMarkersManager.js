import Geometry from '../../../utils/geometry/geometry';
export default class SnapMarkersManager {
    constructor(){
        this.snapSet=new Set();
        this.snapMarkersActive = new Set();
        this.snapMarkersAll = new Set();
        this.activeMarker=null;
    }
    addSnap(snapClass){
        this.snapSet.add(snapClass);
        this.refreshMarkerList();
    }
    removeSnap(snapClass){
        this.snapSet.delete(snapClass);
        this.refreshMarkerList();
    }
    addSnapMarkers(markers){
        if(markers===null) return;
        for(let m of markers){
            this.snapMarkersAll.add(m);
            if(this.snapSet.has(m.constructor)) this.snapMarkersActive.add(m);
        }
    }
    refreshMarkerList(){
        for(let m of this.snapMarkersAll)
            if(this.snapSet.has(m.constructor)) this.snapMarkersActive.add(m);
        for(let m of this.snapMarkersActive)
            if(!this.snapSet.has(m.constructor)) this.snapMarkersActive.delete(m);
    }
    clear(){
        this.snapMarkersAll.clear();
        this.snapMarkersActive.clear();
    }
    getDistanceToNearestMarker(pos,minDistance){
        let marker=null;
        let min=minDistance;
        for(let m of this.snapMarkersActive){
            let d=Geometry.distance(m.getPos(),pos);
            if(d<=minDistance) {
                if(d<=min) {
                    marker=m;
                    min=d;
                }
            }
        }
        this.activeMarker=marker;
        if(marker!=null)return min;else return -1;
    }
    getActiveMarker(){
        return this.activeMarker;
    }
}
