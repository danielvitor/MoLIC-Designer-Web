var molic_v0 = {
  "name": "Diagram v0",
  "role" : "user",
  "signSchema": {
    "id": "ss1",
    "signs":  [
      {
        "id": "s1",
        "name": "city"
      },
      {
        "id": "s2",
        "name": "check-in"
      },
      {
        "id": "s3",
        "name": "check-out"
      },
      {
        "id": "s4",
        "name": "num-rooms"
      },
      {
        "id": "s5",
        "name": "num-adults"
      },
      {
        "id": "s6",
        "name": "num-children"
      },
      {
        "id": "s7",
        "name": "hotel.name"
      },
      {
        "id": "s8",
        "name": "hotel.info"
      },
      {
        "id": "s9",
        "name": "hotel.price"
      },
      {
        "id": "s10",
        "name": "room.type"
      },
      {
        "id": "s11",
        "name": "room.info"
      },
      {
        "id": "s12",
        "name": "room.price"
      },
      {
        "id": "s13",
        "name": "booking code"
      },
      {
        "id": "s14",
        "name": "instructions"
      },
      {
        "id": "s15",
        "name": "holtel"
      },
      {
        "id": "s16",
        "name": "name"
      },
      {
        "id": "s17",
        "name": "e-mail"
      },
      {
        "id": "s18",
        "name": "address"
      },
      {
        "id": "s19",
        "name": "credit card"
      },
      {
        "id": "s20",
        "name": "type of bed"
      },
      {
        "id": "s21",
        "name": "smoking preference"
      }
    ]
  },
  "interactionModel": {
    "id": "im1",
    "role": "client",
    "scenes":  [
      {
        "style" : { "x": 260, "y": 50},
        "id": "scene3",
        "topic": "Autenticate user"
      },
      {
        "style" : { "x": 660, "y": 150},
        "id": "scene4",
        "topic": "Create News"
      },
      {
        "style" : { "x": 260, "y": 150},
        "id": "scene5",
        "topic": "Moderate Comments"
      },
      {
        "style" : { "x": 60, "y": 150},
        "id": "scene6",
        "topic": "Answer to reader's question"
      },
      {
        "style" : { "x": 460, "y": 150},
        "id": "scene6",
        "topic": "create Advertisement"
      }
    ],
    "systemProcesses": [
      { "id": "system1" ,
        "style": {"x":100, "y":200 } 
      },
      { "id": "system2" ,
        "style": {"x":300, "y":500 } 
      },
      { "id": "system3" ,
        "style": {"x":100, "y":500 } 
      },

      { "id": "system4"  ,       
        "style": {"x":200, "y":100 } 
      },

    ],
    "transitionUtterances": [

    ],
    "startPoint": { 
        "style": { "x": -100, "y":-100},
        "id": "start" 
    },
    "ubiquitousAccesses": [
   
    ]
  }
}