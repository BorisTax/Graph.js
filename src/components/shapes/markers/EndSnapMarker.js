import {Rectangle} from '../../../utils/geometry';
import RectangleShape from '../RectangleShape';
import ShapeStyle from '../ShapeStyle';
import {Color} from '../../colors';
import SnapMarker from './SnapMarker';
export default class EndSnapMarker extends SnapMarker {
    static caption = "end points";
    constructor(pos){
        super(pos);
        this.rect=new Rectangle();
    }
    refresh(realRect, screenRect){
        let pos=this.getPos();
        this.rect.width=realRect.width/screenRect.width*SnapMarker.SNAP_MARKER_SIZE;
        this.rect.height=this.rect.width;
        this.rect.topLeft.x=pos.x-this.rect.width/2;
        this.rect.topLeft.y=pos.y+this.rect.height/2;
        let markerShape=new RectangleShape(this.rect);
        markerShape.setStyle(new ShapeStyle(Color.DARK_ORANGE,ShapeStyle.SOLID,3));
        this.setMarker(pos,markerShape);
        super.refresh(realRect,screenRect);
    }
}