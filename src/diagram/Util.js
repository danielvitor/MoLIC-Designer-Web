/**
*	utils file
*/

MoLIC.Util = {

	getPoints : function(shape){

		var ret =   {
            x: shape.getX(),
            y: shape.getY(),
            left: { 
                x: shape.getX(),
                y: ( shape.getY() + shape.getHeight()/2 )
            },
            top: { 
                x: ( shape.getX() + shape.getWidth()/2 ),
                y: shape.getY()
            },
            right: { 
                x: ( shape.getX() + shape.getWidth()    ),
                
                y: ( shape.getY() + shape.getHeight()/2 )
            },
            bottom: { 
                x: ( shape.getX() + shape.getWidth()/2),
                y: ( shape.getY() + shape.getHeight()  )
            }
        };       
        return ret; 
	},

	getInnerPoints : function(shape){

		var ret =   {
            left: { 
                x: 0,
                y: shape.getHeight() / 2 
            },
            top: { 
                x: shape.getWidth() / 2 ,
                y: 0
            },
            right: { 
                x: shape.getWidth(),
                y: shape.getHeight() / 2
            },
            bottom: { 
                x: shape.getWidth() / 2,
                y: shape.getHeight()
            }
        };

        return ret;
    }

};