import Screen from '../../Screen';
import {Circle} from '../../../utils/geometry/geometry';
import CircleShape from '../CircleShape';
import ShapeStyle from '../ShapeStyle';
import {Color} from '../../colors';
import AbstractSnapMarker from './AbstractSnapMarker';

export default class EndSnapMarker extends AbstractSnapMarker {
    static caption = "center points";
    constructor(pos){
        super(pos);
        this.circle=new Circle();
    }
    refresh(realRect, screenRect){
        this.circle.center=this.getPos();
        this.circle.radius=realRect.width*Screen.SNAP_MARKER_SIZE;
        let markerShape=new CircleShape(this.circle);
        markerShape.setStyle(new ShapeStyle(Color.GREEN,ShapeStyle.SOLID));
        this.setMarker(this.circle.center,markerShape);
        super.refresh(realRect,screenRect);
    }
}