package com.boristax.java.graph.shapes.cursors;
import com.boristax.java.graph.shapes.AbstractShape;
import com.boristax.java.graph.shapes.ShapeStyle;
import com.boristax.java.graph.shapes.snapmarkers.EndSnapMarker;
import com.boristax.java.graph.shapes.snapmarkers.MiddleSnapMarker;
import com.boristax.java.graph.shapes.snapmarkers.SnapMarker;
import com.boristax.java.util.geometry.*;
import com.boristax.java.util.geometry.Geometry;

import java.awt.*;
import java.util.ArrayList;

public class DrawCursor extends AbstractShape implements Cursor{
    private Coord2D p;
    private Point2D p0;
    public DrawCursor(Coord2D point){
        super();
        p=point;
        setStyle(new ShapeStyle(Color.BLACK, ShapeStyle.SOLID));
    }
    public void drawSelf(Graphics2D g,DoubleRect realRect, IntRect screenRect){
        refresh(realRect,screenRect);
        g.setColor(getStyle().getColor());
        g.setStroke(getStyle().getStroke());
        int size=10;
        g.drawLine(p0.x-size,p0.y,p0.x+size,p0.y);
        g.drawLine(p0.x,p0.y-size,p0.x,p0.y+size);
    }
    public void refresh(DoubleRect realRect, IntRect screenRect){
        p0 = Geometry.realToScreen(p,realRect,screenRect);
    }

    @Override
    public void setCoord(Coord2D point) {
        p=point;
    }
}
