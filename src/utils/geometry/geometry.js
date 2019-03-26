'use strict';
class Coord2D{
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
    }
    getType(){return "point"}
}
class Point2D {
    constructor(x=0,y=0){
    this.x=x;
    this.y=y;
}
}

class Line{
    constructor(p1,p2){
        this.p1=p1;
        this.p2=p2;
    }
    getType(){return "line"}
}
class StraightLine{
    constructor(){
        let param=arguments;
        let createLine=(p1,p2)=>{
            this.a=p1.y-p2.y;
            this.b=p2.x-p1.x;
            this.c=p1.x*p2.y-p1.y*p2.x;
        }
        switch (param.length) {
            case(0):createLine(new Coord2D(),new Coord2D());break;
            case(1):createLine(param[0].p1,param[0].p2);break;
            case(2):createLine(param[0],param[1]);break;
            case(3):this.a=param[0];this.b=param[1];this.c=param[2];break;
            default:
        }
    }
    getType(){return "sline"}
    getYbyX(x){
        if(this.b!=0)return -(this.a*x+this.c)/this.b;else return NaN;
    }
    getXbyY(y){
        if(this.a!=0)return -(this.b*y+this.c)/this.a;else return NaN;
    }
}

class StraightHalfLine {

    constructor(p1=new Coord2D(), p2=new Coord2D()){
    this.origin=p1;
    this.vector=new Vector();
    this.vector.x=p2.x-p1.x;
    this.vector.y=p2.y-p1.y;
    }

    getYbyX(x){
    if(this.b!=0){
        let y=-(this.a*x+this.c)/this.b;
        if(((x-this.origin.x)*this.vector.x)>=0&&((y-this.origin.y)*this.vector.y)>=0)return y;
        return NaN;
        }
    else return NaN;
    }

    getXbyY(y){
    if(this.a!=0){
        let x=-(this.b*y+this.c)/this.a;
        if(((x-this.origin.x)*this.vector.x)>=0&&((y-this.origin.y)*this.vector.y)>=0)return y;
        return NaN;
    }else return NaN;
    }
}

class Arc {
    constructor(first, second, third){
    this.first=first;
    this.second=second;
    this.third=third;
    this.chord=Math.sqrt((second.x-first.x)*(second.x-first.x)+(second.y-first.y)*(second.y-first.y));
}


}


class Rectangle {
    constructor(topLeft = new Coord2D(), bottomRight = new Coord2D()) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
}

class Circle {
    constructor(center,radius){
    this.center=center;
    this.radius=radius;
}
}

class Vector {
    constructor(p1=new Coord2D(),p2=new Coord2D()){
    this.x=p2.x-p1.x;
    this.y=p2.y-p1.y;
    this.modulus=Math.sqrt(this.x*this.x+this.y*this.y);
    }
}
class Geometry {
    static LineByTwoPoints(p1, p2) {
        return new StraightLine(p1, p2);
    }

    static LinePerpOnPoint(line, p) {
        return new StraightLine(-line.b, line.a, -line.a * p.y + line.b * p.x);
    }

    static LineShifted(line, dx, dy) {
        let p = new Array(2);
        for (let i = 0; i < 2; i++) {
            let x = i;
            let y = line.getYbyX(x);
            if (isNaN(y)) {
                y = i;
                x = line.getXbyY(y);
            }
            x = x + dx;
            y = y + dy;
            p[i] = new Coord2D(x, y);
        }
        return new StraightLine(p[0], p[1]);
    }

    static LinesIntersectionPoint(line1, line2) {
        let d = line1.a * line2.b - line1.b * line2.a;
        if (d == 0) return null;
        let d1 = -line1.c * line2.b - (-line2.c * line1.b);
        let d2 = -line2.c * line1.a - (-line1.c * line2.a);
        return new Coord2D(d1 / d, d2 / d);
    }

    static pointInRect(p, rectTopLeft, rectBottomRight) {
        let sx = (p.x - rectBottomRight.x) * (p.x - rectTopLeft.x);
        let sy = (p.y - rectBottomRight.y) * (p.y - rectTopLeft.y);
        //if(sx<0&&sy<0) return true;
        return (sx <= 0 && sy <= 0);
    }

    static LinesIntersection(sLine, line) {
        let p = Geometry.LinesIntersectionPoint(sLine, new StraightLine(line));
        if (p == null) return null;
        if (!Geometry.pointInRect(p, line.p1, line.p2)) return null;
        return p;
    }

    static LineRectangleIntersection(line, rectTopLeft, rectBottomRight) {
        let lines = new Array(4);
        let points = new Array(4);
        lines[0] = new Line(rectTopLeft.x, rectTopLeft.y, rectBottomRight.x, rectTopLeft.y);
        lines[1] = new Line(rectTopLeft.x, rectBottomRight.y, rectBottomRight.x, rectBottomRight.y);
        lines[2] = new Line(rectTopLeft.x, rectTopLeft.y, rectTopLeft.x, rectBottomRight.y);
        lines[3] = new Line(rectBottomRight.x, rectTopLeft.y, rectBottomRight.x, rectBottomRight.y);
        let i = 0;
        for (let l of lines) {
            points[i] = Geometry.LinesIntersection(line, l);
            i++;

        }
        return points;
    }

    static midPoint(p1, p2) {
        return new Coord2D((p2.x + p1.x) / 2, (p2.y + p1.y) / 2);
    }

    static scalar(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static modulus(v) {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    }

    static angleVectors(v1, v2) {
        return Math.acos(this.scalar(v1, v2) / (v1.modulus * v2.modulus));
    }

    static arcCenterPoint(p1, p2, p3) {
        let line1 = new StraightLine(p1, p2);
        let line2 = new StraightLine(p2, p3);
        let midp1 = Geometry.midPoint(p1, p2);
        let midp2 = Geometry.midPoint(p2, p3);
        let pline1 = Geometry.LinePerpOnPoint(line1, midp1);
        let pline2 = Geometry.LinePerpOnPoint(line2, midp2);
        return Geometry.LinesIntersectionPoint(pline1, pline2);
    }

    static CircleLineIntersection(line, circle) {
        let dx = -circle.center.x;
        let dy = -circle.center.y;

        let sline = Geometry.LineShifted(line, dx, dy);
        let a = sline.a;
        let b = sline.b;
        let c = sline.c;
        let r = circle.radius;
        if (b == 0) {
            a = sline.b;
            b = sline.a;
        }
        let A = a * a + b * b;
        let B = 2 * a * c;
        let C = c * c - r * r * b * b;
        let x = Geometry.QuadEquation(A, B, C);
        if (x == null) return null;
        let res = new Array(x.length);
        for (let i = 0; i < x.length; i++) {
            res[i] = new Coord2D();
            if (sline.b == 0) {
                res[i].y = x[i];
                res[i].x = -(a * x[i] + c) / b;
            } else {
                res[i].x = x[i];
                res[i].y = -(a * x[i] + c) / b;
            }
            res[i].x = res[i].x - dx;
            res[i].y = res[i].y - dy;
        }

        return res;

    }

    static isPointOnHalfLine(line, point) {
        return (((point.x - line.origin.x) * line.vector.x) >= 0 && ((point.y - line.origin.y) * line.vector.y) >= 0);
    }

    static CircleHalfLineIntersection(line, circle) {
        let points = Geometry.CircleLineIntersection(new StraightLine(line.origin, line.vector), circle);
        if (points == null) return null;
        let k = 0;
        let i = 0;
        for (let p of points) {

            if (Geometry.isPointOnHalfLine(line, p)) k++; else points[i] = null;
            i++;
        }
        if (k == 0) return null;
        let res = new Array(k);
        k = 0;
        for (let p of points) if (p != null) {
            res[k++] = p;
        }
        return res;
    }

    static arcMiddlePoint(arc) {
        let mp = Geometry.midPoint(arc.first, arc.third);
        let m = Math.sqrt((mp.x - arc.center.x) * (mp.x - arc.center.x) + (mp.y - arc.center.y) * (mp.y - arc.center.y));
        return new Coord2D(arc.radius / m + arc.center.x, arc.radius / m + arc.center.y);
    }

    static arcToPointArray(arc, limit) {
        if (arc.chord <= limit) {
            let res = new Array(2);
            res[0] = arc.first;
            res[1] = arc.third;
            return res;
        }
        let mp = Geometry.arcMiddlePoint(arc);
        let first = Geometry.arcToPointArray(Geometry.arcByTwoPointsCenter(arc.first, mp, arc.center), limit);
        let second = Geometry.arcToPointArray(Geometry.arcByTwoPointsCenter(mp, arc.third, arc.center), limit);
        let len = first.length - 1 + second.length;
        let res = new Array(len);
        for (let i = 0; i <= len; i++) {
            if (i < first.length - 1) res[i] = first[i];
            else res[i] = second[i];
        }
        return res;
    }

    static arcByTwoPointsCenter(p1, p2, c) {
        let mp = Geometry.midPoint(p1, p2);
        let m = Math.sqrt((mp.x - c.x) * (mp.x - c.x) + (mp.y - c.y) * (mp.y - c.y));
        let r = Math.sqrt((p1.x - c.x) * (p1.x - c.x) + (p1.y - c.y) * (p1.y - c.y));
        return new Arc(p1, new Coord2D(r / m + c.x, r / m + c.y), p2);
    }

    static arcLength(arc) {
        //double[] c=arcCenterPoint(p1,p2,p3);

        //double r=Math.sqrt((p1[0]-c[0])*(p1[1]-c[1]));

        let v1 = new Vector(arc.center, arc.first);
        let v2 = new Vector(arc.center, arc.third);
        let a = Geometry.angleVectors(v1, v2);
        return a * arc.radius;
    }

    static QuadEquation(a, b, c) {
        if (a == 0) return null;
        let d = b * b - 4 * a * c;
        if (d < 0) return null;
        let res = [];
        if (d == 0) {
            res = [];
            res[0] = -b / (2 * a);
            return res;
        }
        res = [];
        res[0] = (-b + Math.sqrt(d)) / (2 * a);
        res[1] = (-b - Math.sqrt(d)) / (2 * a);
        return res;
    }

}
export default Geometry;
export {StraightLine, Line, Circle, Coord2D, Point2D, StraightHalfLine}