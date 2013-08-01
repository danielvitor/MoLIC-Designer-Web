
///////////////////////////////////////////////////////////////////////
// ARROW
///////////////////////////////////////////////////////////////////////
/**
* Arrow constructor
* @constructor
* @augments MoLICDesigner.Arrow
* @param {Object} config
*/
MoLICDesigner.Arrow = function(config) {
    this._initArrow(config);
};

MoLICDesigner.Arrow.prototype = {
    _initArrow: function(config) {
        this.setDefaultAttrs({
            points: [],
            lineCap: 'butt',
            dashArray: [],
            detectionType: 'pixel',
        });

        this.shapeType = "Arrow";

        this.source = MoLICDesigner.stage.get("#sh"+config.source)[0];
        this.target = MoLICDesigner.stage.get("#sh"+config.target)[0];

        config.drawFunc = this.drawFunc;

        // call super constructor
        Kinetic.Line.call(this, config);
    },
    drawFunc: function(context) {
        var lastPos = {};
        context.beginPath();

        this.source.getPoints();
        

        context.moveTo(this.source.getPoints().x, this.source.getPoints().y);

        context.lineTo(this.target.getPoints().x, this.target.getPoints().y);

        if(!!this.attrs.lineCap) {
            context.lineCap = this.attrs.lineCap;
        }

        this.stroke(context);
    }
};
Kinetic.Global.extend(MoLICDesigner.Arrow, Kinetic.Line);