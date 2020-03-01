import {Rectangle} from '../../../utils/geometry';
import RectangleShape from '../RectangleShape';
import ShapeStyle from '../ShapeStyle';
import ShapeBuilder from './ShapeBuilder';
export default class RectangleCreator extends ShapeBuilder{
    static caption="Rectangle";
    rectangle=new Rectangle();
    points=new Array(2);
    constructor(style,screenOuterCircle){
        super(screenOuterCircle)
        this.name="RectangleCreator"
        this.style=style;
        this.shape=new RectangleShape(this.rectangle);
        this.shape.setStyle(style);
    }
    setCurrent(point){
        if(!this.isNext()) return;
        this.points[this.i]=point;
        if(this.i===0)this.points[1]=this.points[0];
        if(this.i>0)this.rectangle=new Rectangle(this.points[0], this.points[1]);
        this.shape=new RectangleShape(this.rectangle);
        this.shape.setStyle(this.style);
    }

    reset(){return new RectangleCreator(new ShapeStyle(this.style.getColor(),this.style.getType()),this.screenOuterCircle);}
}