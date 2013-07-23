/**
*	utils file
*/


var TOP = "TOP",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    BOTTOM = "BOTTOM";


MoLIC.Util = {

	getPoints : function(shape){



		var ret =   {
            LEFT: { 
                x: shape.getX(),
                y: ( shape.getY() + shape.getHeight()/2 ),
                name: LEFT
            },
            TOP: { 
                x: ( shape.getX() + shape.getWidth()/2 ),
                y: shape.getY(),
                name: TOP
            },
            RIGHT: { 
                x: ( shape.getX() + shape.getWidth()    ),
                y: ( shape.getY() + shape.getHeight()/2 ),
                name: RIGHT
            },
            BOTTOM: { 
                x: ( shape.getX() + shape.getWidth()/2),
                y: ( shape.getY() + shape.getHeight()  ),
                name: BOTTOM
            }
        };       
        return ret; 
	},

	getInnerPoints : function(shape){


		var ret =   {
            LEFT: { 
                x: 0,
                y: shape.getHeight() / 2 ,
                name: LEFT
            },
            TOP: { 
                x: shape.getWidth() / 2 ,
                y: 0,
                name: TOP
            },
            RIGHT: { 
                x: shape.getWidth(),
                y: shape.getHeight() / 2,
                name: RIGHT
            },
            BOTTOM: { 
                x: shape.getWidth() / 2,
                y: shape.getHeight(),
                name: BOTTOM
            }
        };

        return ret;
    },

    isNear: function (source, target) {
        var a = source;
        var o = target;
        var ax = a.getX();
        var ay = a.getY();
        
        if(ax > o.x - 20 && ax < o.x + 20 && ay > o.y - 20 && ay < o.y + 20) {
          return true;
        }
        else {
          return false;
        }
    }



};