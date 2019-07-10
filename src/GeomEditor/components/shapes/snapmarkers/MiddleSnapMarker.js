import Screen from '../../Screen';
import Geometry,{Triangle,Coord2D} from '../../../utils/geometry';
import TriangleShape from '../TriangleShape';
import ShapeStyle from '../ShapeStyle';
import {Color} from '../../colors';
import AbstractSnapMarker from './AbstractSnapMarker';

export default class MiddleSnapMarker extends AbstractSnapMarker {
    static caption = "middle points";
    constructor(pos){
    super(pos);
    this.triangle=new Triangle();
}
    refresh(realRect, screenRect){
        let pos=this.getPos();
        let r=realRect.width/screenRect.width*Screen.SNAP_MARKER_SIZE;
        let p=new Array(3);
        p[0]=new Coord2D(pos.x,pos.y+r);
        p[1]=Geometry.rotatePoint(p[0],Math.PI*2/3,pos);
        p[2]=Geometry.rotatePoint(p[1],Math.PI*2/3,pos);
        this.triangle=new Triangle(p);
        let markerShape=new TriangleShape(this.triangle);
        markerShape.setStyle(new ShapeStyle(Color.GREEN,ShapeStyle.SOLID));
        this.setMarker(pos,markerShape);
        super.refresh(realRect,screenRect);
    }
}