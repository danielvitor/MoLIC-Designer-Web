(function() {
 
    // constants
    var 
        OPENINGPOINT = 'OpeningPoint';

    /**
     * Scene constructor
     * @constructor
     * @memberof MoLIC
     * @augments MoLIC.Element
     * @param {Object} config
     * @param {String} config.name
     * {{ShapeParams}}
     * {{NodeParams}}
     * @example
     * var startPoint = new MoLIC.StartPoint({
     * });
     */
    MoLIC.OpeningPoint = function(config) {
        this._initOpeningPoint(config);
        this._draw();
    };

    MoLIC.OpeningPoint.prototype = {
        _initOpeningPoint: function(config) {

            this.className = OPENINGPOINT;

            config.draggable = true;

            // call super constructor
            Kinetic.Group.call(this, config);

            this.x = config.x;
            this.y = config.y;
            this.circle = null;
        },

        _draw: function() {

            this.circle = new Kinetic.Circle 
            ({
                x: 0,
                y: 0,
                radius: 15,
                fill: '#222',
                stroke: '#222',
                strokeWidth: 2
            });

            this.add(this.circle);
        }
    };
    
    Kinetic.Util.extend(MoLIC.OpeningPoint, Kinetic.Group);

})();