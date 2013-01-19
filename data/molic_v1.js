var molic_v1 = {
  "name": "Diagram v1",
  "role": "client",
  "interactionModel": {
    "id": "im1",
    "role": "client",
    "scenes":  [
      {
        "style" : { "x": 100, "y": 150},
        "id": "scene1",
        "topic": "Logon using system account"
      },
      {
        "style" : { "x": 600, "y": 150},
        "id": "scene2",
        "topic": "Logon using facebook account"
      },
      {
        "style" : { "x": 360, "y": 250},
        "id": "scene3",
        "topic": "Create an account"
      },
      {
        "style" : { "x": 760, "y": 350},
        "id": "scene4",
        "topic": "Create News"
      },
      {
        "style" : { "x": 360, "y": 350},
        "id": "scene5",
        "topic": "Moderate Comments"
      },
      {
        "style" : { "x": 160, "y": 350},
        "id": "scene6",
        "topic": "Answer to reader's question"
      },
      {
        "style" : { "x": 560, "y": 350},
        "id": "scene6",
        "topic": "create Advertisement"
      }
    ],
    "systemProcesses": [
      { "id": "system1" ,
        "style": {"x":100, "y":200 } 
      }
    ],
    "transitionUtterances": [
    {
        "id": "ut1",
        "sender": "u",
        "isBreakdown": "false",
        "utterance": "Login using system account",
        "precond": "",
        "pressup": "is afraid of application \n            posting  in your fb profile",
        "gco": "Autenticate user",
        "source": "u1",
        "sourceConnector": "bottom",
        "target": "scene1",
        "targetConnector": "top",
        "utterancePosition" : {
            "x": 150, 
            "y": 70
        }
    },
    {
      "id": "ut2",
      "sender": "u",
      "isBreakdown": "false",
      "utterance": "Login using fb account",
      "precond": "",
      "pressup": "dont wanna sign in",
      "gco": "Autenticate user",
      "source": "u1",
      "sourceConnector": "bottom",
      "target": "scene2",
      "targetConnector": "top",
      "utterancePosition" : {
          "x": 500, 
          "y": 70
      }
    },
     {
      "id": "ut3",
      "sender": "u",
      "isBreakdown": "false",
      "utterance": "Create an account",
      "precond": "not logged in",
      "pressup": "dont have credentials",
      "gco": "Autenticate user",
      "source": "u1",
      "sourceConnector": "bottom",
      "target": "scene3",
      "targetConnector": "top",
      "utterancePosition" : {
          "x": 350, 
          "y": 170
      }
    },
    {
      "id": "ut4",
      "sender": "u",
      "isBreakdown": "false",
      "utterance": "create news",
      "precond": "already logged on",
      "pressup": "",
      "gco": "Create News",
      "source": "u2",
      "sourceConnector": "bottom",
      "target": "scene4",
      "targetConnector": "top",
      "utterancePosition" : {
          "x": 800, 
          "y": 270
      }
    }
    ],
    "ubiquitousAccesses": [
      {
        "id": "u2",
        "name": "U2",
        "style": {
          "x": 800,
          "y": 20
        }
      },
      {
        "id": "u1",
        "name": "U1",
        "style": {
          "x": 400,
          "y": 20
        }
      },

    ]
  }
}