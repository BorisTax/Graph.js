import StraightLineCreator from '../components/shapes/shapecreators/StraightLineCreator';
import RayLineCreator from '../components/shapes/shapecreators/RayLineCreator';
import LineCreator from '../components/shapes/shapecreators/LineCreator';
import CircleCRCreator from '../components/shapes/shapecreators/CircleCRCreator';
import Circle2PCreator from '../components/shapes/shapecreators/Circle2PCreator';
import Circle3PCreator from '../components/shapes/shapecreators/Circle3PCreator';
import RectangleCreator from '../components/shapes/shapecreators/RectangleCreator';
import TriangleCreator from '../components/shapes/shapecreators/TriangleCreator';
import EndSnapMarker from '../components/shapes/snapmarkers/EndSnapMarker';
import MiddleSnapMarker from '../components/shapes/snapmarkers/MiddleSnapMarker';
import CenterSnapMarker from '../components/shapes/snapmarkers/CenterSnapMarker';
export const captions={ENG:{
  createToolBar:"Create",
  createSLine2Points:StraightLineCreator.caption,
  createRayLine2Points:RayLineCreator.caption,
  createSegmentLine2Points:LineCreator.caption,
  createCircleCenter:CircleCRCreator.caption,
  createCircle2P:Circle2PCreator.caption,
  createCircle3P:Circle3PCreator.caption,
  createRect:RectangleCreator.caption,
  createTriangle:TriangleCreator.caption,
  snapToggleBar:"Snap",
  snapGridPoints:"to grid points",
  snapEndPoints: EndSnapMarker.caption,
  snapCenterPoints: CenterSnapMarker.caption,
  snapMiddlePoints: MiddleSnapMarker.caption,
  showGrid:"Show grid",
  propBar:"Properties",
  noShapesSelected:"No shapes selected",
  NShapesSelected:" shapes selected",
  deleteButton:"Delete",
  shapes:{
    Circle:{
      Title:"Circle",
      Radius:"Radius",
      CX:"CenterX",
      CY:"CenterY"
    },
    Rectangle:{
      Title:"Rectangle",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2"
    },
    Line:{
      Title:"Line",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2"
    },
    SLine:{
      Title:"Straight Line AX+BY+C=0",
      A:"A",
      B:"B",
      C:"C"
    },
    RLine:{
      Title:"Ray Line",
      X:"X",
      Y:"Y",
      VX:"VX",
      VY:"VY"
    },
    Triangle:{
      Title:"Triangle",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2",
      X3:"X3",
      Y3:"Y3"
    }
  }
},RUS:
{createCircle2P: "Окружность по двум точкам",
    createCircle3P: "Окружность по трем точкам",
    createCircleCenter: "Окружность из центра",
    createRayLine2Points: "Луч",
    createRect: "Прямоугольник по 2-м точкам",
    createSLine2Points: "Прямая",
    createSegmentLine2Points: "Отрезок",
    createToolBar: "Создать",
    createTriangle: "Произвольный треугольник",
    showGrid: "Отобразить сетку",
    snapCenterPoints: "к центрам окружностей и дуг",
    snapEndPoints: "к конечным точкам",
    snapGridPoints: "к узлам сетки",
    snapMiddlePoints: "к серединным точкам",
    snapToggleBar: "Привязка",
    propBar:"Свойства",
  noShapesSelected:"Нет выделенных фигур",
  NShapesSelected:" фигур выделено",
  deleteButton:"Удалить",
  shapes:{
    Circle:{
      Title:"Окружность",
      Radius:"Радиус",
      CX:"ЦентрX",
      CY:"ЦентрY"
    },
    Rectangle:{
      Title:"Прямоугольник",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2"
    },
    Line:{
      Title:"Отрезок",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2"
    },
    SLine:{
      Title:"Прямая AX+BY+C=0",
      A:"A",
      B:"B",
      C:"C"
    },
    RLine:{
      Title:"Луч",
      X:"X",
      Y:"Y",
      VX:"VX",
      VY:"VY"
    },
    Triangle:{
      Title:"Треугольник",
      X1:"X1",
      Y1:"Y1",
      X2:"X2",
      Y2:"Y2",
      X3:"X3",
      Y3:"Y3"
    }
  }
}
}