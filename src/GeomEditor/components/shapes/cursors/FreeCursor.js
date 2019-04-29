package com.boristax.java.graph.shapes.cursors;

import com.boristax.java.graph.shapes.AbstractShape;
import com.boristax.java.graph.shapes.ShapeStyle;
import com.boristax.java.util.geometry.*;

import java.awt.*;

public class FreeCursor extends AbstractShape implements Cursor{
    private Coord2D p;
    private Point2D p0;
    public FreeCursor(Coord2D point){
        super();
        p=point;
        setStyle(new ShapeStyle(Color.BLACK, ShapeStyle.SOLID));
    }
    public void drawSelf(Graphics2D g,DoubleRect realRect, IntRect screenRect){
        refresh(realRect,screenRect);
        g.setColor(getStyle().getColor());
        g.setStroke(getStyle().getStroke());
        int size=15;
        int rectSize=6;
        g.drawLine(p0.x-size,p0.y,p0.x+size,p0.y);
        g.drawLine(p0.x,p0.y-size,p0.x,p0.y+size);
        g.drawRect(p0.x-rectSize/2,p0.y-rectSize/2,rectSize,rectSize);
    }
    public void refresh(DoubleRect realRect, IntRect screenRect){
        p0 = Geometry.realToScreen(p,realRect,screenRect);
    }

    @Override
    public void setCoord(Coord2D point) {
        p=point;
    }
}
