export const captions={  
  "user":{"name":"Guest"},
  "about":{
    "name":"© Takhmazov Borys, 2018-2019",
    "email":"E-Mail: tboris1983@gmail.com"
    },
    "buttons":{
      "cancel":"Cancel",
      "logout":"Log out",
      "showPass":"Show password",
      "pick":"Pick"
    },
    "registerForm":{
      "title":"Sign Up",
      "name":"Nickname",
      "email":"E-Mail",
      "password":"Password",
      "passwordAgain":"Password again",
      "serverMessages":["","User already exists","E-Mail already exists","","","Internal server error"],
      "inputMessages":["Name length too short (4 char at least)","Name can contain only letters, digits and _",
                    "Password too short (6 char at least)","Passwords aren't equal","E-mail format incorrect"]
    },
    "loginForm":{
      "title":"Sign in",
      "name":"Name or E-Mail",
      "password":"Password",
      "regForm":"Sign Up",
      "rememberMe":"Remember me on this device",
      "messages":["","User data incorrect","","","","Server internal error"]      
    },
    "activation":{
      "title":"Activation",
      "messages":["Activation succeeded. You can now sign in with your login and password.",
                "Activation code is incorrect or expired","","","","Server internal error"]
    },
  "title":"Geometry editor",
  "messages":{
    "deleteShapes":"Delete selected shapes?",
    "logout":"Do you want to log out?",
    "regSucceed":"Registration succeeded. Please check you mailbox to activate account"
  },
  "create":{
    "createToolBar":"Create",
    "createCheckBox":"Repeat",
    "createSLine2Points":"Straight line",
    "createRayLine2Points":"Ray line",
    "createSegmentLine2Points":"Segment line",
    "createCircleCenter":"Circle by center",
    "createCircle2P":"Circle by 2 points",
    "createCircle3P":"Circle by 3 points",
    "createRect":"Rectangle by 2 points",
    "createRectCenter":"Rectangle by center",
    "createTriangle":"Triangle",
    "createTriangleInscribed":"Triangle inscribed in circle",
    "createTriangleDescribed":"Triangle described about circle",
    "createParabola":"Parabola",
    "createHyperbola":"Hyperbola",
    "createFunction":"User defined function",
    "development":"(in development)"
  },
  "modify":{
    "crossSelect":"Partial selection",
    "fullSelect":"Full selection"
  },
  "snap":{
    "snapToggleBar":"Snap",
    "snapGridPoints":" Snap to grid points",
    "snapEndPoints": "Snap to end points",
    "snapCenterPoints": "Snap to center points",
    "snapMiddlePoints": "Snap to middle points"},
  "showGrid":"Show grid",
  "propBar":"Properties",
  "noShapesSelected":"No shapes selected",
  "NShapesSelected":" shapes selected",
  "deleteButton":"Delete",
  "shapes":{
    "Circle":{
      "Title":"Circle",
      "Radius":"Radius",
      "Center":"Center"
    },
    "Rectangle":{
      "Title":"Rectangle",
      "P1":"P1",
      "P2":"P2"
    },
    "Line":{
      "Title":"Line",
      "p0":"P1",
      "p1":"P2"
    },
    "SLine":{
      "Title":"Straight Line AX+BY+C=0",
      "A":"A",
      "B":"B",
      "C":"C"
    },
    "RLine":{
      "Title":"Ray Line",
      "Origin":"Origin",
      "Direction":"Direction"
    },
    "Triangle":{
      "Title":"Triangle",
      "P1":"P1",
      "P2":"P2",
      "P3":"P3"
    }
  },
  "pickers":{
    "PointPicker":{
      "description":"",
      "steps":["Select point"]
    },
    "DistancePicker":{
      "description":"",
      "steps":["Specify 1st point","Specify distance"]
    }
  },
  "creators":{
    "StraightLineCreator":{
      "description":"Straight Line",
      "steps":["Select 1st point","Select 2nd point"]
    },
    "RayLineCreator":{
      "description":"Ray Line",
      "steps":["Select origin point","Select direction point"]
    },
    "LineCreator":{
      "description":"Segment Line",
      "steps":["Select first point","Select second point"]
    },
    "CircleCRCreator":{
      "description":"Circle",
      "steps":["Select center point","Select radius point"]
    },
    "Circle2PCreator":{
      "description":"Circle",
      "steps":["Select first point","Select second point"]
    },
    "Circle3PCreator":{
      "description":"Circle",
      "steps":["Select first point","Select second point","Select third point"]
    },
    "RectangleCreator":{
      "description":"Rectangle",
      "steps":["Select first point","Select second point"]
    },
    "TriangleCreator":{
      "description":"Triangle",
      "steps":["Select first point","Select second point","Select third"]
    },
    "SelectRectCreator":{
      "description":"",
      "steps":["","Specify second selection point"]
    }
  },
  "transform":{
    "move":[
      "Specify base point",
      "Specify point to move",
      ""
    ],
  },
  "help":{
    "title":"Reference",
    "hotKeys":[
    {"key":"ESC","desc":"Cancel"},
    {"key":"Ctrl-A","desc":"Select all"},
    {"key":"Del","desc":"Delete selected"},
    {"key":"C","desc":"Center view to origin"},
    {"key":"Mouse wheel","desc":"Zoom +/-"},
    {"key":"Mouse middle/right button","desc":"Move screen"}
    ]
  }
}