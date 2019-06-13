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
}
}