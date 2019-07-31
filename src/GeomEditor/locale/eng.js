import StraightLineCreator from '../components/shapes/shapecreators/StraightLineCreator';
import RayLineCreator from '../components/shapes/shapecreators/RayLineCreator';
import LineCreator from '../components/shapes/shapecreators/LineCreator';
import CircleCRCreator from '../components/shapes/shapecreators/CircleCRCreator';
import Circle2PCreator from '../components/shapes/shapecreators/Circle2PCreator';
import Circle3PCreator from '../components/shapes/shapecreators/Circle3PCreator';
import RectangleCreator from '../components/shapes/shapecreators/RectangleCreator';
import TriangleCreator from '../components/shapes/shapecreators/TriangleCreator';
export const captions={
  about:{
    name:"© Takhmazov Borys, 2018-2019",
    email:"E-Mail: tboris1983@gmail.com",
  },
  user:{
    name:"Guest"
  },
  registerForm:{
    title:"Sign up",
    name:"Nickname",
    email:"E-Mail",
    password:"Password",
    passwordAgain:"Password again",
    messages:["","User already exists","E-Mail already exists","Internal server error"]
  },
  loginForm:{
    title:"Sign in",
    name:"Name or E-Mail",
    password:"Password",
    regForm:"Sign up",
    messages:["","User data incorrect","Server internal error"]
  },
  title:"Geometry editor",
  messages:{
    deleteShapes:"Delete selected shapes?",
    
  },
  create:{
    createToolBar:"Create",
    createCheckBox:"Cyclic",
    createSLine2Points:StraightLineCreator.caption,
    createRayLine2Points:RayLineCreator.caption,
    createSegmentLine2Points:LineCreator.caption,
    createCircleCenter:CircleCRCreator.caption,
    createCircle2P:Circle2PCreator.caption,
    createCircle3P:Circle3PCreator.caption,
    createRect:RectangleCreator.caption,
    createRectCenter:"Rectangle by center",
    createTriangle:TriangleCreator.caption,
    createTriangleInscribed:"Triangle inscribed in circle",
    createTriangleDescribed:"Triangle described about circle",
    createParabola:"Parabola",
    createHyperbola:"Hyperbola",
    createFunction:"User defined function",
    development:"(in development)",
  },
  modify:{
    crossSelect:"Partial selection",
    fullSelect:"Full selection"
  },
  snap:{snapToggleBar:"Snap",
    snapGridPoints:"Snap to grid points",
    snapEndPoints: "Snap to end points",
    snapCenterPoints: "Snap to center points",
    snapMiddlePoints: "Snap to middle points"
  },
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
  },
  help:{
    title:'Reference',
    hotKeys:[
    {key:"Ctrl-A",desc:'Select all'},
    {key:"Del",desc:'Delete selected'},
    {key:"C",desc:'View to origin'},
    {key:"Mouse wheel",desc:'Zoom +/-'},
    {key:"Mouse middle button",desc:'Move screen'}
    ]
  }
}
