///////////////////////////////////////////////////////////////////////
//  StartPoint
///////////////////////////////////////////////////////////////////////
/**
 * StartPoint constructor
 * @constructor
 * @augments MoLICDesigner.Start 
 * @param {Object} config
 */
MoLICDesigner.StartPoint = function(config) {
    this._initStartPoint(config);   
};

MoLICDesigner.StartPoint.prototype = {
    _initStartPoint: function(config) {
        this.setDefaultAttrs({
            x: 0,
            y: 0,
            radius: 15,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 4,
            draggable: false
        });

        this.shapeType = "StartPoint";
        this.data = config.data;

        config.drawFunc = Kinetic.Circle.drawFunc;

        // call super constructor
        Kinetic.Circle.call(this, config);
    },
   getMultiPoints: function(){
        var ret =   {
            x: this.attrs.x,
            y: this.attrs.y,
            left: { 
                x: this.attrs.x,
                y: ( this.attrs.y - this.attrs.radius )
            },
            top: { 
                x: this.attrs.x  ,
                y: ( this.attrs.y - this.attrs.radius )
            },
            right: { 
                x: ( this.attrs.x + this.attrs.radius ),
                y: ( this.attrs.y )
            },
            bottom: { 
                x: ( this.attrs.x ),
                y: ( this.attrs.y + this.attrs.radius )
            }
        };       

        return ret; 
    }
};
Kinetic.Global.extend(MoLICDesigner.StartPoint, Kinetic.Circle);
